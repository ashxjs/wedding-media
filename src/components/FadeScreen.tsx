"use client";
import cx from "classnames";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FunctionComponent, useEffect, useState } from "react";

const useScreenSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return { width, height };
};

type FadeScreenProps = {
  bgImagePath: string;
};

export const FadeScreen: FunctionComponent<FadeScreenProps> = ({
  bgImagePath,
}) => {
  const { width, height } = useScreenSize();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, height], [1, 0]);

  return (
    <section className="w-full h-screen sticky top-0 overflow-hidden mb-[100vh]">
      <main className={cx("w-full h-screen relative")}>
        <Image
          priority
          alt="logo"
          quality={100}
          fetchPriority="high"
          width={width}
          height={height}
          src={bgImagePath}
          className="object-cover w-full h-full"
        />
        <motion.div
          className="scroll-fade-in absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center"
          style={{ opacity }}
        >
          <h1 className="font-playwrite text-white text-center text-8xl font-bold leading-[10rem]">
            Léana & Alexis
          </h1>
        </motion.div>
      </main>
    </section>
  );
};
