import { h, Component } from 'preact'

export default class Table extends Component {
  render() {
    const { title, data } = this.props

    return (
      <div className="table">
        <div className="table_title">{title}</div>
        <table className="table_content">
          <tbody>
            {data.map(({ id, values }) => <tr key={id}>{values.map((value) => <td key={value}>{value}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}
