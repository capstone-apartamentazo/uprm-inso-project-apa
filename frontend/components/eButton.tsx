import React from 'react'
import Link from 'next/link'

type ButtonProps = {
  bgColor?: string;
  hoverBgColor?: string;
  focusBgColor?: string;
  textColor?: string;
  fontWeight?: string;
  py?: string;
  px?: string;
  rounded?: string;
  width?: string;
  height?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
const eButton: React.FC<ButtonProps> = ({ bgColor, hoverBgColor, focusBgColor, textColor = "white", fontWeight = "bold", py = "2", px = "4", rounded = "md", width = "auto", height = "auto", href, onClick, children }) => {
  const bg = bgColor || "primary";
  const hv = hoverBgColor || "secondary";
  const fc = focusBgColor || "";
  const btnClassNames = `bg-${bg} hover:bg-${hv} text-${textColor}  font-${fontWeight} py-${py} px-${px} rounded-${rounded}`;


  // if (href) {
  //   return (
  //     <Link href={href}>
  //       <div onClick={onClick} className={`flex justify-center items-center ${btnClassNames}`} style={{ width, height }}>
  //         {children}
  //       </div>
  //     </Link>
  //   )
  // }

  return (
    <button className={btnClassNames} style={{ width, height }} onClick={onClick}>
      {children}
    </button>
  )
}

export default eButton
