'use client';

import { setDefaultAutoSelectFamily } from 'net';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

/**
 * Interface for login form input data
 */
interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Expected response structure from authentication API
 */
interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  message?: string;
}

/**
 * Internal state management interface for the LoginForm component
 */
interface LoginFormState {
  formData: LoginFormData;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

/**
 * Authenticates user with backend API
 * 
 * @param credentials - User login credentials (email and password)
 * @returns Promise that resolves to authentication response
 * @throws Error if authentication fails or network error occurs
 */
// const loginAPI = async (credentials: LoginFormData): Promise<AuthResponse> => {
//   try {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     });
//
//     const data = await response.json();
//
//     if (!response.ok) {
//       throw new Error(data.message || 'Login failed');
//     }
//
//     return data;
//   } catch (error) {
//     throw new Error(error instanceof Error ? error.message : 'Network error occurred');
//   }
// };

/**
 * Logs out user and clears session on backend
 * 
 * @returns Promise that resolves when logout is complete
 * @note Errors are logged to console but don't throw to prevent UX issues
 */
// const logoutAPI = async (): Promise<void> => {
//   try {
//     await fetch('/api/auth/logout', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.error('Logout error:', error);
//   }
// };

/**
 * LoginForm React Component
 * 
 * Complete authentication form with validation, API integration,
 * and responsive UI. Handles the full login flow from input validation
 * to successful authentication and logout.
 * 
 * API Requirements:
 * - POST /api/auth/login - expects {email, password}, returns {success, token, user, message}
 * - POST /api/auth/logout - clears user session
 * 
 * @returns JSX.Element - Rendered login form or success screen
 */
export default function LoginForm() {
  const [state, setState] = useState<LoginFormState>({
    formData: {
      email: '',
      password: '',
    },
    isLoading: false,
    error: null,
    isAuthenticated: false,
  });

  /**
   * Validates form input data
   * 
   * @returns true if validation passes, false otherwise
   * @sideEffect Sets error state if validation fails
   */
  const validateForm = (): boolean => {
    const { email, password } = state.formData;
    
    if (!email.trim()) {
      setState(prev => ({ ...prev, error: 'Email is required' }));
      return false;
    }
    
    if (!email.includes('@')) {
      setState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return false;
    }
    
    if (!password.trim()) {
      setState(prev => ({ ...prev, error: 'Password is required' }));
      return false;
    }
    
    if (password.length < 6) {
      setState(prev => ({ ...prev, error: 'Password must be at least 6 characters long' }));
      return false;
    }
    
    return true;
  };

  /**
   * Handles input field changes and updates form state
   * 
   * @param field - The form field being updated (email or password)
   * @param value - The new value for the field
   * @sideEffect Updates formData state and clears any existing errors
   */
  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
      error: null, // Clear error when user starts typing
    }));
  };

  /**
   * @param e - Form submission event
   * @sideEffect Updates multiple state properties and localStorage
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    // try {
    //   const response = await loginAPI(state.formData);
    //   
    //   if (response.success && response.token) {
    //     // Store token in localStorage (can be changed later)
    //     localStorage.setItem('authToken', response.token);
    //     
    //     setState(prev => ({
    //       ...prev,
    //       isLoading: false,
    //       isAuthenticated: true,
    //       error: null,
    //     }));
    //     
    //     // Can redirect here after successful login
    //     console.log('Login successful:', response.user);
    //   } else {
    //     throw new Error(response.message || 'Login failed');
    //   }
    // } catch (error) {
    //   setState(prev => ({
    //     ...prev,
    //     isLoading: false,
    //     error: error instanceof Error ? error.message : 'An unexpected error occurred',
    //   }));
    // }
    };


  const handleLogout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    // try {
    //   await logoutAPI();
    //   localStorage.removeItem('authToken');
    //   
    //   setState({
    //     formData: { email: '', password: '' },
    //     isLoading: false,
    //     error: null,
    //     isAuthenticated: false,
    //   });
    // } catch (error) {
    //   setState(prev => ({ ...prev, isLoading: false }));
    // }
    // --- END API logic ---
    // NOTE: Error point for future reference:
    // - setState({ ... error: error.message }) in API catch block (commented)
  };

  /**
   * Render Logic:
   * - If authenticated: Show success screen with logout option
   * - If not authenticated: Show login form with validation
   */

  // Here render authenticated view
  if (state.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
        {/* Left: Success Section */}
        <div className="w-3/5 p-5 flex flex-col items-center justify-center">
          <div className="text-left font-bold self-start">
          The <span className="text-green-500">Conspectus</span>
          </div>
          <div className="py-4" />
          <h2 className="text-3xl font-bold text-green-500 mb-2">
          Login Successful!
          </h2>
          <div className="border-2 w-10 border-green-500 inline-block mb-2" />
          <p className="text-gray-600 mb-6">
          Welcome back! You are now logged in.
          </p>
          <button
          onClick={handleLogout}
          className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white transition-colors"
          disabled={state.isLoading}
          >
          {state.isLoading ? 'Logging out...' : 'Log Out'}
          </button>
        </div>
        {/* Right: Welcome Section */}
        <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
          <div className="border-2 w-10 bg-white inline-block mb-2 border-green-500" />
          <p className="mb-2">
          You have successfully signed in. Start your journey with us!
          </p>
          <Link
          href="/"
          className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold text-white hover:bg-white hover:text-green-500 transition-colors"
          >
          Go to Dashboard
          </Link>
        </div>
        </div>
      </main>
      </div>
    );
  }

    // Here render login form
  return (
    <div className = "min-h-screen  flex items-center justify-center bg-gray-50 px-4">
      <div className  = "w-full max-w-md  bg-white shadow-lg rounded-xl p-8">
        <h2 className = "text-2xl font-semibold text-gray-900 mb-2"> Sign in </h2>
        <p className = "text-gray-500 mb-6">  Sign in to access your saved survey data</p>
        <form onSubmit = {handleSubmit} className="space-y-5">
          <div> 
            <label className = "block text-sm font-medium text-gray-700"> Email </label>
            <input
            type="email"
            placeholder= "Enter your email"
            value={state.formData.email}
            onChange = {(e)=> handleInputChange('password', e.target.value)}
            required
            className= "mt-1 w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div> 

        <div> 
          <label className  = "block text-sm font-medium text-gray-700"> Password</label> 
          <input
          type="password"
          placeholder= "Enter your password"
          value={state.formData.password}
          onChange = {(e)=> handleInputChange('email', e.target.value)}
          required
          className= "mt-1 w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          </div>
        {state.error  &&(
          <p className="text-red-500 text-sm text-center"> </p>
        )}
        <button
        type = "submit"
        disabled = {state.isLoading}
        className = "w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg  transition"
        >
          Sign In
          
          </button>
        </form>

        <p className= "text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account? {' '}

          <Link href= "/signup"  className = "text-indigo-600  hover:underline"> 
          Sign Up </Link>  {/* Sign Up UI in progress */}
        </p>
         </div> 

      </div>
  );
}
