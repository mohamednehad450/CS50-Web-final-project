import { FC } from "react";
import { ScaleBand } from "d3-scale";

interface BandAxisLeftProps {
    yScale: ScaleBand<string>
    innerWidth: number
    reverse?: boolean
    hideLineTicks?: boolean
    getLabel?: (tickValue: string) => string
}

const BandAxisLeft: FC<BandAxisLeftProps> = ({ yScale, getLabel, innerWidth, reverse, hideLineTicks }) => (

    <>
        {yScale.domain().map(tickValue => (
            <g className="tick"
                transform={`translate(0,${reverse ?
                    (yScale.range()[1] + (-yScale.bandwidth() - (yScale(tickValue) || 0))) :
                    (yScale(tickValue) || 0)
                    })`}
            >
                {!hideLineTicks && <line x2={innerWidth} className="tick-line" />}
                <text
                    className="tick-text"
                    key={tickValue}
                    style={{ textAnchor: 'end' }}
                    x={-10}
                    y={(yScale.bandwidth() / 2)}
                    dy=".32em"
                >
                    {getLabel ? getLabel(tickValue) : tickValue}
                </text>
            </g>
        ))}
        <g className="tick" >
            <line y2={yScale.range()[1]} y1={yScale.range()[1]} x1={0} x2={innerWidth} className="tick-line" />
        </g>
    </>
);

export default BandAxisLeft