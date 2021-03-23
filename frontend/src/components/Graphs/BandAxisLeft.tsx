import { FC } from "react";
import { ScaleBand } from "d3-scale";

interface BandAxisLeftProps {
    yScale: ScaleBand<string>
    innerWidth: number
    innerHeight: number
    tickFormat?: (tickValue: string) => string
}

const BandAxisLeft: FC<BandAxisLeftProps> = ({ yScale, innerWidth, innerHeight, tickFormat }) => (
    <>

        {yScale.domain().map((tickValue) => (
            <g
                className="tick"
                key={tickValue}
                transform={`translate(0,${(innerHeight - yScale.bandwidth() - (yScale(tickValue) || 0))})`}
            >
                <line x2={innerWidth} className="tick-line" />
                <text style={{ textAnchor: 'middle' }} dx="-1em" dy="0.4em" className="tick-text" >
                    {tickFormat ? tickFormat(tickValue) : tickValue}
                </text>
            </g>
        ))}
        <g className="tick" >
            <line y2={innerHeight} y1={innerHeight} x1={0} x2={innerWidth} className="tick-line" />
        </g>
    </>
);

export default BandAxisLeft