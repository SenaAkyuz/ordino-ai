import { logoutAction } from '@/lib/auth-actions'

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-caption font-medium text-ink-50 hover:text-ink transition-colors px-3 py-1.5 rounded-md hover:bg-bg-soft"
      >
        Log out
      </button>
    </form>
  )
}
