import Image from '@/components/Image'

const HEADER_MAX_WIDTH = 'max-w-[1000px]'

interface Experience {
  category: string
  items: {
    title: string
    period: string
    description?: string
    role?: string
    link?: string
    linkText?: string
    thumbnail?: string
  }[]
}

const experiences: Experience[] = [
  {
    category: '논문',
    items: [
      {
        title: 'HTML 클러스터링과 심층 언어 모델을 활용한 전자책 템플릿 추천',
        period: '2025',
        description: '장동호, 서정헌, 최원영, 김지환, 이성진, 부석준, & 서영건. (2025). HTML 클러스터링과 심층 언어 모델을 활용한 전자책 템플릿 추천. Journal of Digital Contents Society, 26(2), 479-488.',
        link: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12091194',
        linkText: '논문'
      },
      {
        title: '이커머스 도메인에서의 동일 태그 교체 데이터 증강 기법을 활용한 개체명 인식',
        period: '2024',
        description: '장동호, 부석준, & 서영건. 이커머스 도메인에서의 동일 태그 교체 데이터 증강 기법을 활용한 개체명 인식. Journal of Digital Contents Society, 25(5), 1159-1166.',
        link: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11792258',
        linkText: '논문'
      },
      {
        title: '기계학습을 이용한 부동산 전월세 매물 예측 연구: 경상남도 진주 지역을 사례로',
        period: '2023',
        description: '장동호, 최유경, 강하연, & 서영건. 기계학습을 이용한 부동산 전월세 매물 예측 연구: 경상남도 진주 지역을 사례로. In Proceedings of KIIT Conference (pp. 403-406).',
        link: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11652057',
        linkText: '논문'
      }
    ]
  },
  {
    category: '수상',
    items: [
      {
        title: '과학기술정보통신부 제11회 K-해커톤 우수상',
        period: '2023',
        description: '독거노인과 대학생의 홈쉐어링을 중개하는 플랫폼 \'그랜파(GrandPartner)\' 백엔드 개발',
        link: 'http://www.k-hackathon.com/view.asp?idx=1149&boardcode=notice&page=',
        linkText: '자세히'
      },
      {
        title: '한국정보기술학회 대학생 논문 경진대회 동상',
        period: '2023',
        description: '부동산 전월세 매물 예측 연구',
        link: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11652057',
        linkText: '자세히'
      },
      {
        title: 'LH 빅데이터로 우리동네 문제해결 아이디어 공모대회 장려상',
        period: '2023',
        description: '실거래를 기반으로 도출한 진주시 월별 임차 물량 예측',
        link: 'https://compas.lh.or.kr/subj/result/downloadAttachPdfFile?subjNo=SBJ_2305_001&teamNo=2088&attFileId=2443&fileNo=1#toolbar=0',
        linkText: '자세히'
      },
      {
        title: '경상남도 소프트웨어 경진대회 최우수상',
        period: '2022',
        description: '마크업 언어 교육용 소프트웨어 \'CoWeb\' 기획',
        link: 'https://www.gnict.org/%EA%B2%8C%EC%8B%9C%ED%8C%90/sw%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C/%EC%A0%9C2%ED%9A%8C-%EA%B2%BD%EB%82%A8%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C-%EA%B0%9C%EC%B5%9C-%EC%95%88%EB%82%B4/',
        linkText: '자세히'
      }
    ]
  },
  {
    category: '활동',
    items: [
      {
        title: '네이버 부스트캠프 웹•모바일 10기 (JavaScript)',
        period: '2025',
        description: '웹 풀스택 과정 교육',
      },
      {
        title: '네이버 소프트웨어야 놀자 대학생 멘토',
        period: '2023',
        description: '경상남도 초등학생 대상 인공지능 교육 프로그램 진행',
      },
      {
        title: 'UMC 3기 (Node.js)',
        period: '2022',
        description: '대학생 IT 연합 동아리 UMC 활동',
      }
    ]
  },
  {
    category: '미디어',
    items: [
      {
        title: 'KBS 진주 보이는 라디오 인터뷰',
        period: '2024',
        description: '교내 정보 제공 카카오톡 챗봇 \'커넥트 지누\' 서비스 소개',
        link: 'https://www.youtube.com/watch?v=B3Gx3Jap5vA&ab_channel=KBS%EC%A7%84%EC%A3%BC',
        linkText: '인터뷰',
        thumbnail: '/images/about/kbs-radio.jpg'
      },
      {
        title: '교내 방송사 신문 기사',
        period: '2024',
        description: '교내 정보 제공 카카오톡 챗봇 \'커넥트 지누\' 서비스 소개',
        link: 'https://www.gnunews.kr/news/articleView.html?idxno=28480',
        linkText: '기사',
        thumbnail: '/images/about/newspaper.jpg'
      }
    ]
  },
  {
    category: '교육',
    items: [
      {
        title: '경상국립대학교 컴퓨터공학과 학사 (졸업)',
        period: '2025',
        description: '학점: 4.0 / 4.5 (전공 학점: 4.17 / 4.5)',
      }
    ]
  }
]

const introduce = `안녕하세요! 저는 백엔드 개발자를 꿈꾸는 장동호입니다!
누군가에게 도움이 되는 서비스를 만들고, "정말 도움이 많이 됐다"는 이야기를 들을 때 가장 큰 보람을 느낍니다.
지금은 신뢰받는 동료이자 좋은 서비스를 만드는 개발자가 되기 위해 꾸준히 학습하고 성장하고 있습니다.
`

export default function About() {
  return (
    <div className="p-0 bg-background">
      <header className="bg-background pt-12 px-8 pb-8 mb-8 border-b border-border md:pt-8 md:px-4 md:pb-6">
        <h1 className={`mb-2 ${HEADER_MAX_WIDTH} mx-auto`}>장동호</h1>
        <p className={`text-text-secondary text-lg ${HEADER_MAX_WIDTH} mx-auto md:text-base whitespace-pre-wrap`}>
          {introduce}
        </p>
      </header>

      <div className={`${HEADER_MAX_WIDTH} mx-auto px-8 pb-16 bg-background md:px-4 md:pb-12`}>
        <div className="space-y-12">
          {experiences.map((experience, sectionIndex) => (
            <section 
              key={experience.category} 
              className="pb-8 border-b border-border last:border-b-0 about-section"
              style={{
                animationDelay: `${sectionIndex * 0.1}s`
              }}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-8 pb-2 border-b-2 border-primary inline-block">
                {experience.category}
              </h2>
              <div className="space-y-8 mt-6">
                {experience.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative pl-6 border-l-2 border-border about-item"
                    style={{
                      animationDelay: `${(sectionIndex * 0.1) + ((index + 1) * 0.05)}s`
                    }}
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                    <div className="flex flex-col md:flex-row md:items-start md:gap-4">
                      <div className="shrink-0 mb-2 md:mb-0">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {item.period}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex-1 w-full">
                          <h3 className="text-lg font-semibold text-text-primary mb-2">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-text-secondary mb-3 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                          {item.link && item.linkText && (
                            <a
                              href={item.link}
                              className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.linkText}
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          )}
                        </div>
                        {item.thumbnail && (
                          <div className="shrink-0 w-full md:w-48">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              link={item.link}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}


