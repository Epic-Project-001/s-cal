import LogoLight from "@/public/assets/images/logo-light.png";
import LogoDark from "@/public/assets/images/logo-dark.png";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="w-[270px] xl:w-[433px] h-15 xl:h-[77px] relative">
        <Image src={LogoLight} fill alt="Entrance" className="dark:hidden" />
        <Image
          src={LogoDark}
          fill
          alt="Entrance"
          className="hidden dark:block"
        />
      </div>
    </header>
  );
}
