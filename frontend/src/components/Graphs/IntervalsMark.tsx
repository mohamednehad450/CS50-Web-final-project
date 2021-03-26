import { FC } from "react"


import type { IntervalWithTodo } from "../../API"

interface IntervalsMarkProps {
    intervals: IntervalWithTodo[]
    width: number
    height: number
    x: number
    y: number
    getIntervalLength: (i: IntervalWithTodo) => number
    formatTooltip: (n: number) => string
}

const IntervalsMark: FC<IntervalsMarkProps> = ({
    intervals,
    getIntervalLength,
    formatTooltip,
    width,
    height,
    x,
    y,
}) => {
    let yOffset = y
    const lengths = intervals.map(i => getIntervalLength(i))
    const maxLength = lengths.reduce((acc, n) => acc + n, 0)
    return (
        <>
            {intervals.map((interval, i) => {
                const intervalHeight = height * (lengths[i] / maxLength)
                yOffset -= intervalHeight
                return (
                    <rect
                        key={interval.id}
                        className="todomark"
                        width={width}
                        height={intervalHeight}
                        x={x}
                        y={yOffset}
                        fill={interval.todo?.tag?.color || "#ffffff"}
                    >
                        <title
                            className="todomark-title"
                        >
                            {formatTooltip(lengths[i])}
                        </title>
                    </rect>
                )
            })}
        </>
    )
}

export default IntervalsMark