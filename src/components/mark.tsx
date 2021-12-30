export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>
  }
  const arr = name.split(keyword)
  // 例如: 管理项目管理1, 拆分后: ['', '项目', '1'], 所以每个str后面加上keyword -> '' + '管理' + '项目' + '管理' + '1'
  return (
    <>
      {arr.map((str: string, index: number) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: '#257AFD' }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  )
}
