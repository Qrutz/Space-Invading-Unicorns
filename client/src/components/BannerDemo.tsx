import React from "react";
import { BackgroundBeamsWithCollision } from "./Banner";
import img from "../assets/spaceinvadingunicorns.png";

export function BackgroundBeamsWithCollisionDemo() {
    return (
        <BackgroundBeamsWithCollision>
            {/* Container with flexbox to center content */}
            <div className="flex flex-col items-center justify-center h-screen space-y-6">
                {/* Image at the top */}
                <img src={img} alt="Space Invading Unicorns" className="w-32 h-32 rounded-full md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto" />

                {/* Main heading */}
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-white font-pixel">
                    What is the most suitable <br /> country for you to live in?
                </h2>

                {/* Subheading */}
                <p className="text-base md:text-lg lg:text-xl text-center text-gray-400">
                    Add your preferences and find out!
                </p>
            </div>
        </BackgroundBeamsWithCollision>
    );
}
