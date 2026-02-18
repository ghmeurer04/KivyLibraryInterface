interface Props{
    tableColumns: string[];
    tableContent: any[];
}

function Table({ tableColumns, tableContent }: Props) {
    return (
        <section className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 shadow-2xl shadow-emerald-950/30">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-heading">
                        <thead className="sticky top-0 z-10 bg-gradient-to-r from-emerald-300/15 via-white/5 to-transparent text-[11px] uppercase tracking-[0.2em] text-heading/70">
                            <tr>
                                {tableColumns.map((col) => (
                                    <th key={col} className="px-6 py-4 font-semibold">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {tableContent.length === 0 ? (
                                <tr>
                                    <td colSpan={tableColumns.length} className="px-6 py-8 text-center text-heading/60">
                                        Nothing to show.
                                    </td>
                                </tr>
                            ) : (
                                tableContent.map((row, index) => (
                                    <tr
                                        key={index}
                                        className="transition hover:bg-white/5 even:bg-white/[0.02]"
                                    >
                                        {row.map((col, colIndex) => (
                                            <td key={colIndex} className="px-6 py-4">
                                                {col ?? "—"}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Table;
