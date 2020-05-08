import React, {ReactNode} from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import { FaFlag, FaBomb } from 'react-icons/fa'
import './style.scss'
import { BoardValuesEnum } from '../../enums'


interface BoardProps {
    matrix: (BoardValuesEnum|number)[][]
    onLeftClick: (row: number, col: number) => void
    onRightClick: (
        row: number,
        col: number,
        value: BoardValuesEnum | null
    ) => void,
    boardBlocked: boolean
}

type ValueBoardIndex<K extends string> = { [key in K]?: string | null | ReactNode }

const displayValueByBoardValue: ValueBoardIndex<BoardValuesEnum> = {
    [BoardValuesEnum.BLANK_REVEALED_POSITION]: null,
    [BoardValuesEnum.QUESTION_MARK]: "?",
    [BoardValuesEnum.BOMB_FLAGGED]: <FaFlag size={15} />,
    [BoardValuesEnum.BOMB_REVEALED_POSITION]: <FaBomb size={15} />,
}

const getColumnClasses = (col: string|number, boardBlocked: boolean) => {
    return classNames({
        'board__column': true,
        'board__column--selected': col === BoardValuesEnum.BLANK_REVEALED_POSITION || typeof col === 'number',
        'board__column--mine-exploited': col === BoardValuesEnum.BOMB_REVEALED_POSITION,
        'board__column--board-blocked': boardBlocked,
    })
}

const getColumnValue = (col: BoardValuesEnum|number) => {
    if (typeof col === 'number') {
        return col
    }

    return displayValueByBoardValue[col]
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
    const { matrix, onLeftClick, onRightClick, boardBlocked } = props

    const handleRightClick = (rowIdx: number, colIdx: number, row: (BoardValuesEnum|number)[]) => {
        const currentValue =  row[colIdx]
        let nextValue;

        switch (currentValue) {
            case BoardValuesEnum.MASKED_POSITION:
                nextValue = BoardValuesEnum.BOMB_FLAGGED
                break
            case BoardValuesEnum.BOMB_FLAGGED:
                nextValue = BoardValuesEnum.QUESTION_MARK
                break
            case BoardValuesEnum.QUESTION_MARK:
                nextValue = BoardValuesEnum.RESET_POSITION
                break
            default:
                nextValue = null
                break
        }

        onRightClick(rowIdx, colIdx, nextValue)
    }

    return (
        <div className="board">
            {matrix.map((row, rowIdx) => (
                <div className="board__row" key={`${rowIdx}_${row.join(',')}`}>
                    {row.map((col, colIdx) => (
                        <div 
                            className={classNames(getColumnClasses(col, boardBlocked))} key={`${colIdx}_${col}`}
                            onClick={() => {
                                if (!boardBlocked) {
                                    onLeftClick(rowIdx, colIdx)
                                }
                            }}
                            onContextMenu={(evt) => {
                                evt.preventDefault()

                                if (!boardBlocked) {
                                    handleRightClick(rowIdx, colIdx, row)
                                }
                            }}
                        >
                            {
                                col === BoardValuesEnum.MASKED_POSITION
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