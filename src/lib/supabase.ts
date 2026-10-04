import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContactFormData, ContactMessageRecord } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Client-side singleton Supabase client
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Validation rules
export interface ValidationErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  general?: string;
}

export function validateContactForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Full name is required.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !data.email.trim()) {
    errors.email = 'Work email is required.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Project message is required.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Please provide at least 10 characters describing your inquiry.';
  }

  return errors;
}

// Service to submit contact messages to contact_messages table
export async function submitContactMessage(formData: ContactFormData): Promise<{
  success: boolean;
  message: string;
  record?: ContactMessageRecord;
  isDemoFallback?: boolean;
}> {
  // 1. Validation check
  const errors = validateContactForm(formData);
  if (Object.keys(errors).length > 0) {
    const firstErrorMessage = Object.values(errors)[0];
    throw new Error(firstErrorMessage || 'Please complete all required fields correctly.');
  }

  const payload: ContactFormData = {
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    company: formData.company?.trim() || '',
    message: formData.message.trim()
  };

  // 2. If Supabase is configured, submit to the real PostgreSQL database
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: payload.name,
            email: payload.email,
            company: payload.company || null,
            message: payload.message
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error(error.message || 'Failed to submit message to Supabase.');
      }

      return {
        success: true,
        message: 'Your message has been received. Our solutions team will reach out within 24 hours.',
        record: data as ContactMessageRecord,
        isDemoFallback: false
      };
    } catch (err: unknown) {
      console.error('Database connection error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Database error occurred.';
      throw new Error(errorMessage);
    }
  }

  // 3. Graceful fallback for local development before Supabase keys are configured in .env
  // Persists to localStorage to allow full interactive testing and verification
  const demoRecord: ContactMessageRecord = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `msg-${Date.now()}`,
    ...payload,
    created_at: new Date().toISOString()
  };

  try {
    const stored = localStorage.getItem('nexora_demo_messages');
    const list: ContactMessageRecord[] = stored ? JSON.parse(stored) : [];
    list.unshift(demoRecord);
    localStorage.setItem('nexora_demo_messages', JSON.stringify(list.slice(0, 50)));
  } catch (e) {
    console.warn('Could not cache demo message in local storage:', e);
  }

  // Simulate network latency (350ms) for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    success: true,
    message: 'Message successfully registered! (Saved in local preview buffer; configure VITE_SUPABASE_URL to connect to live Supabase)',
    record: demoRecord,
    isDemoFallback: true
  };
}

// Helper to inspect persisted messages (useful for verification test)
export function getRecentLocalMessages(): ContactMessageRecord[] {
  try {
    const stored = localStorage.getItem('nexora_demo_messages');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
