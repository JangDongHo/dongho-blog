import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-background">
      <div className="text-center py-12 px-8 bg-background rounded-2xl border border-border md:py-8 md:px-6 md:mx-4">
        <h1 className="text-[8rem] font-bold text-primary mb-4 leading-none tracking-[-0.03em] md:text-[5rem]">404</h1>
        <h2 className="mb-4 text-text-primary text-[1.75rem] md:text-2xl">페이지를 찾을 수 없습니다</h2>
        <p className="text-text-secondary text-lg mb-8 leading-[1.6] md:text-base">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link href="/" className="inline-block py-4 px-8 bg-primary text-white rounded-lg no-underline font-bold transition-all duration-200 hover:bg-[#1B64DA] hover:-translate-y-0.5 hover:text-white">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}


