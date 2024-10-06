import { useState } from "react";

interface FilterComponentProps {
    title: string;
    minLabel: string;
    maxLabel: string;
    minRange: number;
    maxRange: number;
    initialRange: number;
    onRangeChange: (newValue: number) => void;
    onPriorityChange: (newPriority: number) => void;
}

export function FilterComponent({
    title,
    minLabel,
    maxLabel,
    minRange,
    maxRange,
    initialRange,
    onRangeChange,
    onPriorityChange,
}: FilterComponentProps) {
    const [priority, setPriority] = useState(1);
    const [value, setValue] = useState(initialRange);
    const [priorityInfo, showPriorityInfo] = useState(false);

    const handlePriorityClick = (value: number) => {
        setPriority(value);
        onPriorityChange(value); // Update the parent with new priority
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        onRangeChange(newValue); // Update the parent with new slider value
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-4 sm:p-6 rounded-3xl bg-white shadow-lg w-full sm:w-80 relative font-Fred">
            <div className="bg-purple-700 text-white text-sm sm:text-lg font-semi px-6 sm:px-8 py-1.5 sm:py-2 rounded-full absolute -top-6 sm:-top-8">
                {title.toUpperCase()}
            </div>

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

            <div className="flex flex-col items-center space-y-2">
                <p className="text-xs sm:text-sm text-gray-700">
                    Priority
                    <button
                        onMouseEnter={() => showPriorityInfo(true)}
                        onMouseLeave={() => showPriorityInfo(false)}
                        className="w-6 h-6 rounded-full text-purple-700 font-bold text-s ml-1 bg-yellow-300"
                    >i</button>
                </p>

                {priorityInfo && (
                    <div className="absolute top-0 left-8 p-3 w-42 bg-purple-200 text-gray-700 text-xs rounded shadow-lg z-10">
                        Choose how important this filter is for you.<br />
                        4 has the highest importance and 0 excludes this filter.
                    </div>
                )}

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
