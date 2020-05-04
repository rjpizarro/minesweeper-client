import React from 'react'
import classNames from 'classnames'
import { get } from 'lodash'
import './style.scss'

interface BoardProps {
    matrix: (string|number)[][]
    onLeftClick: (row: number, col: number) => void
    onRightClick: (row: number, col: number) => void
}

const getColumnClasses = (col: string|number) => {
    return classNames({
        'board__column': true,
        'board__column--selected': col !== '[]'
    })
}

const getColumnValue = (col: string|number) => {
    return col === 'E' ? null : col
}

const getColumnValueColor = (col: string|number) => {
    const colorByValue: any = {
        '1': 'blue',
        '2': 'green',
        '3': 'red',
        '4': '#0a0f6b',
        '5': '#43286b',
        '6': '#2e0d32',
        '7': '#04032c',
        '8': '#000',
    }

    return get(colorByValue, [String(col)], '')
}

const Board = (props: BoardProps) => {
    const { matrix, onLeftClick, onRightClick } = props

    return (
        <div className="board">
            {matrix.map((row, rowIdx) => (
                <div className="board__row" key={`${rowIdx}_${row.join(',')}`}>
                    {row.map((col, colIdx) => (
                        <div 
                            className={classNames(getColumnClasses(col))} key={`${colIdx}_${col}`}
                            onClick={() => onLeftClick(rowIdx, colIdx)}
                            onContextMenu={(evt) => {
                                evt.preventDefault()
                                onRightClick(rowIdx, colIdx)
                            }}
                        >
                            {
                                col === '[]'
                                ? null
                                : <span className="board__value" style={{color: getColumnValueColor(col)}}>
                                    { getColumnValue(col) }
                                </span>
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board