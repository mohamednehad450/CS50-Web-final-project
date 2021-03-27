import { FC } from "react";
import { scaleBand, scaleLinear, } from "d3-scale";
import { formatMinToHour } from "../../utils";
import { IntervalsMark, TagsMark, LinearAxisLeft } from ".";


import type { StatsContext } from ".";
import type { IntervalWithTodo } from "../../API";

interface PomodoroGraphProps {
    stats: StatsContext['pomodoroStats']
    settings: {
        time: 'real' | 'default',
        sortby: "todos" | 'tags',
    }

}

interface IntervalDataItem {
    id: string,
    title: string
    intervals: IntervalWithTodo[]
}


const WIDTH = 550;
const HEIGHT = 400;
const MARGIN = { top: 20, right: 170, bottom: 10, left: 70 };
const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
const innerWidth = WIDTH - MARGIN.left - MARGIN.right;


function getIntervalLength(i: IntervalWithTodo, setting: 'real' | 'default') {
    if (setting === 'real') {
        return (new Date(i.endDate).getTime() - new Date(i.startDate).getTime()) / 1000 / 60
    } else return i.defaultDuration / 60
}



const PomodoroGraph: FC<PomodoroGraphProps> = ({ stats, settings }) => {

    const { intervals, tags, todos } = stats


    const data: IntervalDataItem[] = []

    if (settings.sortby === 'tags') {
        for (let tag of tags.values()) {
            data.push({
                intervals: intervals.filter(i => i.todo?.tag?.id === tag.id),
                id: String(tag.id),
                title: tag.label,
            })
        }
        const noneIntervals = intervals.filter(i => !i.todo?.tag)
        noneIntervals.length && data.push({ id: 'NONE', title: 'None', intervals: noneIntervals })
    }
    else {
        for (let todo of todos.values()) {
            data.push({
                intervals: intervals
                    .filter(i => i.todo?.id === todo.id),
                id: String(todo.id),
                title: todo.title,
            })
        }
        const noneIntervals = intervals.filter(i => !i.todo)
        noneIntervals.length && data.push({ id: 'NONE', title: 'None', intervals: noneIntervals })
    }

    const xScale = scaleBand<any>()
        .domain(data.map(d => d.id))
        .range([0, innerWidth])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    const maxY = Math.max(data
        .reduce((acc, d) => Math.max(
            acc,
            d.intervals.reduce<number>((acc, i) => acc + getIntervalLength(i, settings.time), 0)
        ), 0),
        60)

    const yScale = scaleLinear()
        .domain([0, maxY])
        .range([0, innerHeight]);

    return (
        <>
            <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
                <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                    {/* Used intead of BandAxisBottom since there's no need for labels */}
                    <g className="tick" >
                        <line y2={innerHeight} className="tick-line" />
                        <line y2={innerHeight} y1={0} x1={innerWidth} x2={innerWidth} className="tick-line" />
                    </g>
                    <LinearAxisLeft
                        innerWidth={innerWidth}
                        yScale={yScale}
                        tickFormat={formatMinToHour}
                        reverse
                    />
                    {data.map(d => (
                        <IntervalsMark
                            key={d.id}
                            formatTooltip={formatMinToHour}
                            x={xScale(d.id) || 0}
                            y={innerHeight}
                            height={yScale(d.intervals
                                .reduce((acc, i) => acc + getIntervalLength(i, settings.time), 0) || 0)}
                            width={xScale.bandwidth()}
                            intervals={d.intervals}
                            getIntervalLength={(i) => getIntervalLength(i, settings.time)}
                        />
                    ))}
                    <TagsMark
                        tags={data.map(d => ({
                            id: d.id,
                            label: d.title,
                            color: d.intervals[0].todo?.tag?.color || '#FFF'
                        }))}
                        x={innerWidth + 36}
                        y={12}
                    />
                </g>
            </svg>

        </>
    )
}

export default PomodoroGraph