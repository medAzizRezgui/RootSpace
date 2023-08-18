export interface UserDetails {
  id: string;
  lastName: string;
  firstName?: string;
  avatar_url: string;
  email?: string;
}
export interface UserAppMetadata {
  provider?: string;
  [key: string]: any;
}
export interface Factor {
  /** ID of the factor. */
  id: string;

  /** Friendly name of the factor, useful to disambiguate between multiple factors. */
  friendly_name?: string;

  /**
   * Type of factor. Only `totp` supported with this version but may change in
   * future versions.
   */
  factor_type: "totp" | string;

  /** Factor's status. */
  status: "verified" | "unverified";

  created_at: string;
  updated_at: string;
}
export interface UserMetadata {
  [key: string]: any;
}
export interface UserIdentity {
  id: string;
  user_id: string;
  identity_data?: {
    [key: string]: any;
  };
  provider: string;
  created_at?: string;
  last_sign_in_at?: string;
  updated_at?: string;
}
export interface User {
  id: string;
  app_metadata: UserAppMetadata;
  user_metadata: UserMetadata;
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  identities?: UserIdentity[];
  factors?: Factor[];
}
export interface Like {
  created_at: string;
  id: number;
  post_id: number;
  user_id: string;
}
export interface Post {
  body: string;
}
export interface FetchedPosts extends Post {
  body: string;
  created_at: string;
  id: number;
  user_id: string;
  likes: Like[];
  users: {
    firstName: string;
    lastName: string;
    avatar_url: string;
  };
}
