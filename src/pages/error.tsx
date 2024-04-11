import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="font-bond text-4xl">Whoops, something happened!</h1>
      <p className="text-accent-foreground">
        An error occurred in the application, below you can find more details:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Back to the{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          ROMTech Challenge
        </Link>
      </p>
    </div>
  )
}
