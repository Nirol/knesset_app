import React from "react";
import { useTable, useSortBy, useExpanded } from 'react-table';





function YeshuvTable({ columns, data, renderRowSubComponent, }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,

  } = useTable({ columns, data },
    useSortBy,
    useExpanded)



  return (
    <>
      <table   {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr className="myrow" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                if (column.id === "BZB") {
                  return (
           
                      <th data-tip='בעלי זכות בחירה' data-for='test' className="myheader" {...column.getHeaderProps()}>{column.render('Header')}</th>
                    
                     )}
                else if ( column.id === "address" ) {
                  return (
                    <th style={{width: 245}}  className="myheader" {...column.getHeaderProps()}>{column.render('Header')}</th>
                  )                  
                }
                else if (column.id === "location" ) {
                  return (
                    <th style={{width: 315}}   className="myheader" {...column.getHeaderProps()}>{column.render('Header')}</th>
                  )                  
                }  
                else {
                  return (
                    <th className="myheader" {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ) }}
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            const rowProps = row.getRowProps()
            const rowPropsKey = {}
            rowPropsKey.key = rowProps.key
            return (
              // Use a React.Fragment here so the table markup is still valid
              <React.Fragment {...rowPropsKey}>
                <tr className="myrow">
                  {row.cells.map(cell => {
                    
                    if (cell.column.id === "accessible") {
                      if (cell.value) {
                        return (
                          <td className="mycell" {...cell.getCellProps()}>+</td>
                        )
                      }
                      else {

                        return (
                          <td className="mycell" {...cell.getCellProps()}>-</td>
                        )
                      }


                    }


                    else {

                      return (
                        <td className="mycell" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    }
                  }


                  )}
                </tr>
                {/*
                        If the row is in an expanded state, render a row with a
                        column that fills the entire length of the table.
                      */}
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/*
                              Inside it, call our renderRowSubComponent function. In reality,
                              you could pass whatever you want as props to
                              a component like this, including the entire
                              table instance. But for this example, we'll just
                              pass the row
                            */}
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
      <br />

    </>
  );
}




export default YeshuvTable;
