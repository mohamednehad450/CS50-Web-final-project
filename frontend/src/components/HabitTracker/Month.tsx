import { FC, useEffect, useState } from "react"
import { Habit } from "../../API"
import { Checkbox } from "../common"

const divByN = (i: number, n: number) => i % n === 0

const getDaysInMonth = (m: number, y: number) => {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (m === 1 && divByN(y, 4) && divByN(y, 100) && divByN(y, 400)) return 29
    else return months[m % months.length]
}

const daySym = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', "Sa"]

interface MonthProps {
    date: Date
    entries: Habit['entries']
    onChange: (d: Date, checked: boolean) => void
    updateDate?: boolean
}

const Month: FC<MonthProps> = ({ date: initDate, entries, onChange, updateDate }) => {
    const [date, setDate] = useState(initDate)
    useEffect(() => {
        updateDate && setDate(initDate)
    }, [initDate, updateDate])

    const m = date.getMonth()
    const y = date.getFullYear()
    const daysInMonth = getDaysInMonth(m, y)

    date.setDate(1)
    const fistDayOfWeek = date.getDay()

    const rows = Math.ceil((fistDayOfWeek + daysInMonth) / 7)
    const dSet = new Set<string>(entries.map(d => new Date(d).toLocaleDateString()))
    return (
        <table className="table-container">
            <thead>
                <tr className="entries-row">
                    {daySym.map(s => <td className="entry">{s}</td>)}
                </tr>
            </thead>
            <tbody>
                {[...Array(rows)].map((_, row) => (
                    <tr className="entries-row">
                        {[...Array(7)].map((_, cell) => {
                            const day = cell - fistDayOfWeek + (row * 7) + 1
                            const cellDate = (day < 1 || day > daysInMonth) ? null : new Date(`${y}/${m + 1}/${day}`)
                            const checked = !!cellDate && dSet.has(cellDate.toLocaleDateString())
                            const isToday = cellDate?.toLocaleDateString() === new Date().toLocaleDateString()
                            return (
                                <td
                                    className={
                                        `entry${checked ? ' entry-checked' : ''}${isToday ? ' entry-today' : ''}`
                                    }
                                >
                                    {cellDate && (
                                        <Checkbox
                                            checked={checked}
                                            onChange={(checked) => onChange(cellDate, checked)}
                                        />)}
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )

}

export default Month