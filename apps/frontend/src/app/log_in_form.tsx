/**
 * User authentication form with the following features:
 * - Email and password validation
 * - Loading states and error handling
 * - Token-based authentication with localStorage
 * - Success/logout functionality
 * - Responsive design with TailwindCSS
 */

/**
 * NOTES:
 * 
 * 1. Backend Integration:
 *    - Ensure backend provides the expected API endpoints
 *    - Modify API URLs if needed (currently set to /api/auth/login and /api/auth/logout)
 *    - Update AuthResponse interface if API returns different data structure
 * 
 * 2. Styling Customization:
 *    - Styles use TailwindCSS utility classes
 *    - Modify color schemes by changing color classes (indigo-*, red-*, green-*)
 * 
 * 3. Error Handling:
 *    - Network errors are caught and displayed
 *    - Form validation provides immediate feedback
 *    - Loading states prevent double submissions
 *
 * 4. Future Enhancements:
 *    - Add remember me functionality
 *    - Implement password reset flow
 *    - Add social login options
 *    - Include form field animations
 */

'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

/**
 * Interface for login form input data
 */
interface LoginFormData {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
}

/**
 * Expected response structure from authentication API
 */
interface AuthResponse {
  /** Whether the authentication was successful */
  success: boolean;
  /** JWT token for authenticated sessions (optional) */
  token?: string;
  /** User information returned upon successful login (optional) */
  user?: {
    /** Unique user identifier */
    id: string;
    /** User's email address */
    email: string;
    /** User's display name (optional) */
    name?: string;
  };
  /** Error or success message from the server (optional) */
  message?: string;
}

/**
 * Internal state management interface for the LoginForm component
 */
interface LoginFormState {
  /** Current form input values */
  formData: LoginFormData;
  /** Whether a request is currently being processed */
  isLoading: boolean;
  /** Current error message, null if no error */
  error: string | null;
  /** Whether the user is currently authenticated */
  isAuthenticated: boolean;
}

/**
 * API integration functions
 */

/**
 * Authenticates user with backend API
 * 
 * @param credentials - User login credentials (email and password)
 * @returns Promise that resolves to authentication response
 * @throws Error if authentication fails or network error occurs
 */
const loginAPI = async (credentials: LoginFormData): Promise<AuthResponse> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Network error occurred');
  }
};

/**
 * Logs out user and clears session on backend
 * 
 * @returns Promise that resolves when logout is complete
 * @note Errors are logged to console but don't throw to prevent UX issues
 */
const logoutAPI = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
};

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
   * Handles form submission and authentication process
   * 
   * Process:
   * 1. Prevents default form submission
   * 2. Validates form data
   * 3. Sets loading state
   * 4. Calls login API
   * 5. Stores token and updates authentication state
   * 6. Handles errors and updates UI accordingly
   * 
   * @param e - Form submission event
   * @sideEffect Updates multiple state properties and localStorage
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await loginAPI(state.formData);
      
      if (response.success && response.token) {
        // Store token in localStorage (can be changed later)
        localStorage.setItem('authToken', response.token);
        
        setState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        }));
        
        // Can redirect here after successful login
        console.log('Login successful:', response.user);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    }
  };

  /**
   * Handles user logout process
   * 
   * Process:
   * 1. Sets loading state
   * 2. Calls logout API to clear server session
   * 3. Removes token from localStorage
   * 4. Resets all form state to initial values
   */
  const handleLogout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await logoutAPI();
      localStorage.removeItem('authToken');
      
      setState({
        formData: { email: '', password: '' },
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
    }
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* Left: Sign In Section */}
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              The <span className="text-green-500">Conspectus</span>
            </div>

            <div className="py-4" />
            <h2 className="text-3xl font-bold text-green-500 mb-2">
              Sign in to your account
            </h2>
            <div className="border-2 w-10 border-green-500 inline-block mb-2" />

            {/* Social Login Icons */}
            <div className="flex justify-center my-2">
              <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                <FaLinkedinIn className="text-sm" />
              </a>
              <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                <FaGoogle className="text-sm" />
              </a>
            </div>

            <p className="text-black">or use your email account</p>

            {/* Form Inputs */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center m-2">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>

              <div className="bg-gray-100 w-64 p-2 flex items-center m-2">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>

              <div className="flex w-64 justify-between mb-5">
                <label className="flex items-center text-xs">
                  <input type="checkbox" name="remember" className="mr-1" />
                  Remember Me
                </label>
                <Link href="#" className="text-xs">Forgot Password?</Link>
              </div>

              {/* Sign In Button */}
              <a
                href="#"
                className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
              >
                Sign In
              </a>
            </div>
          </div>

          {/* Right: Welcome Section */}
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello There!</h2>
            <div className="border-2 w-10 bg-white inline-block mb-2 border-green-500" />
            <p className="mb-2">
              Fill out personal information and start your journey with us
            </p>
            <Link
              href= "/login/signup"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold text-white hover:bg-white hover:text-green-500"
            >Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
