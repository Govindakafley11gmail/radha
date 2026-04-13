/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Footer from "@/component/footer/footer";
import MissionVisionComponent from "./component/body/mission-vision-tab";
import ImageComponent from "./component/headerImage";


export default function AboutUsComponent() {
 

  return (
    <div className="w-screen">
        <ImageComponent/>
        <MissionVisionComponent/>
        <Footer/>
    </div>
  );
}
