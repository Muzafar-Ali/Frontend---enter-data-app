// app/record/[userId]/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      <p className="ml-4 text-lg text-white">Loading user records...</p>
    </div>
  )
}