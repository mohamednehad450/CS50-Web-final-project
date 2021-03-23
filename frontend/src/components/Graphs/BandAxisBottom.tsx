import { FC } from "react";
import { ScaleBand } from "d3-scale";

interface BandAxisBottomProps {
    xScale: ScaleBand<string>
    innerHeight: number
    innerWidth: number
    tickFormat?: (tickValue: string) => string
}

const BandAxisBottom: FC<BandAxisBottomProps> = ({
    xScale,
    innerHeight,
    innerWidth,
    tickFormat,
}) => (
    <>
        {xScale.domain().map((tickValue) => (
            <g className="tick">
                <text
                    key={tickValue}
                    style={{
                        textAnchor: 'middle',
                    }}
                    className="tick-text"
                    fill="gray"
                    dy="1.32em"
                    x={(xScale(tickValue) || 0) + xScale.bandwidth() / 2}
                    y={innerHeight}
                >
                    {tickFormat ? tickFormat(tickValue) : tickValue}
                </text>
            </g>
        ))}
        <g className="tick" >
            <line y2={innerHeight} className="tick-line" />
            <line y2={innerHeight} y1={0} x1={innerWidth} x2={innerWidth} className="tick-line" />
        </g>
    </>
);

export default BandAxisBottom