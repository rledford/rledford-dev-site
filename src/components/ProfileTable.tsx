import type { Component } from 'solid-js';

interface TableRowData {
  label: string;
  value: string;
  id?: string;
}

interface ProfileTableProps {
  rows: TableRowData[];
  class?: string;
}

const ProfileTable: Component<ProfileTableProps> = (props) => {
  return (
    <table class={`w-full text-sm ${props.class || ''}`}>
      <tbody>
        {props.rows.map((row, index) => (
          <tr class={index < props.rows.length - 1 ? 'border-b' : ''}>
            <td class="py-1">{row.label}</td>
            <td id={row.id} class="py-1 text-center">
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileTable;
