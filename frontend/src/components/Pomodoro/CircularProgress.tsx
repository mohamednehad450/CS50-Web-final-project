import React, { ReactNode, FC, } from 'react'
import { Spring } from 'react-spring/renderprops'
interface CircularProgressProps {
    progress: number;
    innerText?: string
    // Used to rapidly update the innerText with the animation, negates InnerText prop
    setText?: (progress: number) => string
    children?: ReactNode
}

// Constents
const { PI, cos, sin } = Math
const SIZE = 360
const r = 160
const CENTER = SIZE / 2
const STROKE_WIDTH = 8
const HEAD_SIZE = 24
const circumference = r * 2 * PI

const CircularProgress: FC<CircularProgressProps> = ({ progress, innerText, setText }) => {

    const theta = (1 - progress) * (2 * PI)

    return (
        <Spring from={{ theta: 0 }} to={{ theta, }}>
            {({ theta }) =>
                <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
                    className="progress"
                >
                    {/* Tint */}
                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r={r}
                        fill="transparent"
                        stroke="gray"
                        strokeWidth={STROKE_WIDTH}
                        className="progress-tint"
                    />
                    <text className="progress-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
                        {setText ? setText(((2 * PI) - theta) / (2 * PI)) : innerText}
                    </text>
                    {/* Progress */}
                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r={r}
                        fill="transparent"
                        stroke="tomato"
                        strokeWidth={STROKE_WIDTH}
                        strokeDasharray={`${circumference}, ${circumference}`}
                        strokeDashoffset={theta * r}
                        className="rotate90 progress-main"
                    />
                    {/* Head */}
                    <circle
                        cx={r * cos(theta) + CENTER}
                        cy={-r * sin(theta) + CENTER}
                        r={HEAD_SIZE / 2}
                        fill='white'
                        stroke="tomato"
                        strokeWidth={HEAD_SIZE / 10}
                        className="rotate90 progress-head"
                    />
                </svg>
            }
        </Spring>
    )
}

export default CircularProgress
