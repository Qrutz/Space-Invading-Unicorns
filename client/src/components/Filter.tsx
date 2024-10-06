import { useState } from "react";

interface FilterComponentProps {
    title: string;
    minLabel: string;
    maxLabel: string;
    minRange: number;
    maxRange: number;
    initialRange: number;
}

export function FilterComponent({
    title,
    minLabel,
    maxLabel,
    minRange,
    maxRange,
    initialRange,
}: FilterComponentProps) {
    const [priority, setPriority] = useState(1);
    const [value, setValue] = useState(initialRange);

    const handlePriorityClick = (value) => {
        setPriority(value);
    };

    const handleSliderChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-4 sm:p-6 rounded-3xl bg-white shadow-lg w-full sm:w-80 relative">
            {/* Header */}
            <div className="bg-purple-700 text-white text-sm sm:text-lg font-bold px-6 sm:px-8 py-1.5 sm:py-2 rounded-full absolute -top-6 sm:-top-8">
                {title.toUpperCase()}
            </div>

            {/* Slider */}
            <div className="flex flex-col items-center w-full space-y-2">
                <input
                    type="range"
                    min={minRange}
                    max={maxRange}
                    value={value}
                    onChange={handleSliderChange}
                    className="w-3/4 sm:w-full h-2 bg-purple-700 rounded-full outline-none appearance-none cursor-pointer"
                />
                <div className="flex justify-between w-full text-xs sm:text-sm text-gray-600">
                    <span>{minLabel}</span>
                    <span>{maxLabel}</span>
                </div>
            </div>

            {/* Priority */}
            <div className="flex flex-col items-center space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-700">
                    Priority
                </p>
                <div className="flex space-x-2 sm:space-x-3">
                    {[0, 1, 2, 3, 4].map((value) => (
                        <button
                            key={value}
                            onClick={() => handlePriorityClick(value)}
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full text-white font-bold ${priority === value ? "bg-purple-700" : "bg-purple-200"
                                } flex items-center justify-center`}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
