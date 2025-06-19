import { SignInWithGitHub } from "./SignInWithGitHub";

export async function VisionBoardModal() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70">
      <div className="flex min-h-screen items-center justify-center">
        <SignInWithGitHub />
      </div>
    </div>
  );
}
