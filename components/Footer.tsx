import { footerLinks } from '@/constants/constants';
import Image from 'next/image';
import Link from 'next/link';
type Props = {}
type FooterColumnProps = {
    title: string;
    links: Array<string>
}
const FooterColumn =({title,links}:FooterColumnProps)=>(
    <div className="footer_column">
        <h4 className='font-semibold'>{title}</h4>
        <ul className="flex flex-col gap-2 font-normal">
            {links.map((link)=> (
                <Link href="/">{link}</Link>
            ))}
        </ul>
    </div>

)
const Footer = (props: Props) => {
  return (
    <footer className='flexStart footer'>
        <div className="flex flex-col gap-12 w-full">
            <div className="flex items-start flex-col">
                <Image src="/logo-purple.svg" height={38} width={115} alt="Flexibble"/>
                <p className="mt-5 font-normal max-w-xs text-start text-sm">
                    Flexibble is the world's leading community fro creatives to share,grow, and get hired.
                </p>
            </div>
            <div className="flex flex-wrap gap-12">
                <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links}/>
                <div className="flex-1 flex flex-col gap-4">
                <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links}/>
                <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links}/>
                </div>
                <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links}/>
                <div className="flex-1 flex flex-col gap-4">
                <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links}/>
                <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links}/>
                    </div>
                    <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links}/>
              </div>
        </div>
    <div className="flexBetween footer_copyright">
        <p>&copy; 2023 Flexibble All Rights Reserved</p>
        <p className="text-gray">
            <span className='text-black font-semibold'>10,214</span>Projects Submitted
        </p>
    </div>
    </footer>
  )
}

export default Footer