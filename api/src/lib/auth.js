// Define what you want `currentUser` to return throughout your app. For example,
// to return a real user from your database, you could do something like:
//
//   export const getCurrentUser = async ({ email }) => {
//     return await db.user.findUnique({ where: { email } })
//   }
//
// If you want to enforce role-based access ...
//
// You'll need to set the currentUser's roles attributes to the
// collection of roles as defined by your app.
//
// This allows requireAuth() on the api side and hasRole() in the useAuth() hook on the web side
// to check if the user is assigned a given role or not.
//
// How you set the currentUser's roles depends on your auth provider and its implementation.
//
// For example, your decoded JWT may store `roles` in it namespaced `app_metadata`:
//
// {
//   'https://example.com/app_metadata': { authorization: { roles: ['admin'] } },
//   'https://example.com/user_metadata': {},
//   iss: 'https://app.us.auth0.com/',
//   sub: 'email|1234',
//   aud: [
//     'https://example.com',
//     'https://app.us.auth0.com/userinfo'
//   ],
//   iat: 1596481520,
//   exp: 1596567920,
//   azp: '1l0w6JXXXXL880T',
//   scope: 'openid profile email'
// }
//
// The parseJWT utility will extract the roles from decoded token.
//
// The app_medata claim may or may not be namespaced based on the auth provider.
// Note: Auth0 requires namespacing custom JWT claims
//
// Some providers, such as with Auth0, will set roles an authorization
// attribute in app_metadata (namespaced or not):
//
// 'app_metadata': { authorization: { roles: ['publisher'] } }
// 'https://example.com/app_metadata': { authorization: { roles: ['publisher'] } }
//
// Other providers may include roles simply within app_metadata:
//
// 'app_metadata': { roles: ['author'] }
// 'https://example.com/app_metadata': { roles: ['author'] }
//
// And yet other may define roles as a custom claim at the root of the decoded token:
//
// roles: ['admin']
//
// The function `getCurrentUser` should return the user information
// together with a collection of roles to check for role assignment:

import { AuthenticationError, ForbiddenError, parseJWT } from '@redwoodjs/api'
import { db } from 'src/lib/db'

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param {string=, string[]=} role - An optional role
 *
 * @example - No role-based access control.
 *
 * export const getCurrentUser = async (decoded) => {
 *   return await db.user.findUnique({ where: { decoded.email } })
 * }
 *
 * @example - User info is contained in the decoded token and roles extracted
 *
 * export const getCurrentUser = async (decoded, { _token, _type }) => {
 *   return { ...decoded, roles: parseJWT({ decoded }).roles }
 * }
 *
 * @example - User record query by email with namespaced app_metadata roles
 *
 * export const getCurrentUser = async (decoded) => {
 *   const currentUser = await db.user.findUnique({ where: { email: decoded.email } })
 *
 *   return {
 *     ...currentUser,
 *     roles: parseJWT({ decoded: decoded, namespace: NAMESPACE }).roles,
 *   }
 * }
 *
 * @example - User record query by an identity with app_metadata roles
 *
 * const getCurrentUser = async (decoded) => {
 *   const currentUser = await db.user.findUnique({ where: { userIdentity: decoded.sub } })
 *   return {
 *     ...currentUser,
 *     roles: parseJWT({ decoded: decoded }).roles,
 *   }
 * }
 *
 * @example - Cookies and other request information are available in the req parameter, just in case
 *
 * const getCurrentUser = async (_decoded, _raw, { event, _context }) => {
 *   const cookies = cookie(event.headers.cookies)
 *   const session = cookies['my.cookie.name']
 *   const currentUser = await db.sessions.findUnique({ where: { id: session } })
 *   return currentUser
 * }
 */
 export const getCurrentUser = async (decoded) => {
  //return { ...decoded, roles: parseJWT({ decoded }).roles }
  const userRoles = await db.userRole.findMany({
    where: { user: { uuid: decoded.sub } },
    select: { name: true },
  })

  const roles = userRoles.map((role) => {
    return role.name
  })

  return context.currentUser || { roles }
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param {string=} roles - An optional role or list of roles
 * @param {string[]=} roles - An optional list of roles

 * @example
 *
 * // checks if currentUser is authenticated
 * requireAuth()
 *
 * @example
 *
 * // checks if currentUser is authenticated and assigned one of the given roles
 * requireAuth({ role: 'admin' })
 * requireAuth({ role: ['editor', 'author'] })
 * requireAuth({ role: ['publisher'] })
 */
 export const requireAuth = ({ roles } = {}) => {

  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (typeof roles !== 'undefined' && typeof roles === 'string' && !context.currentUser.roles?.includes(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }

  if (
    typeof roles !== 'undefined' &&
    Array.isArray(roles) &&
    !context.currentUser.roles?.some((role) => roles.includes(role))
  ) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
