export interface ExportableCustomer {
  name: string;
  phone: string;
  city: string;
  orders: number;
  totalSpent: number;
}

function escapeXml(value: string | number): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stringCell(value: string, styleId: string, mergeAcross?: number): string {
  const merge = mergeAcross ? ` ss:MergeAcross="${mergeAcross}"` : '';
  return `<Cell ss:StyleID="${styleId}"${merge}><Data ss:Type="String">${escapeXml(
    value
  )}</Data></Cell>`;
}

function numberCell(value: number, styleId: string): string {
  return `<Cell ss:StyleID="${styleId}"><Data ss:Type="Number">${value}</Data></Cell>`;
}

const CELL_BORDERS = `<Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E9E9ED"/></Borders>`;

export function exportCustomersToExcel(customers: ExportableCustomer[]): void {
  const headerRow = `<Row>${[
    stringCell('Customer', 'sHeader'),
    stringCell('Phone', 'sHeader'),
    stringCell('City', 'sHeader'),
    stringCell('Total Orders', 'sHeader'),
    stringCell('Lifetime Spend (BDT)', 'sHeader'),
  ].join('')}</Row>`;

  const dataRows = customers
    .map(
      (customer) =>
        `<Row>${[
          stringCell(customer.name, 'sText'),
          stringCell(customer.phone, 'sText'),
          stringCell(customer.city, 'sText'),
          numberCell(customer.orders, 'sCenter'),
          numberCell(customer.totalSpent, 'sCurrency'),
        ].join('')}</Row>`
    )
    .join('');

  const totalOrders = customers.reduce((sum, customer) => sum + customer.orders, 0);
  const totalSpent = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);

  const totalRow = `<Row>${stringCell(
    `Totals (${customers.length} customers)`,
    'sTotal',
    2
  )}${numberCell(totalOrders, 'sTotalNumber')}${numberCell(
    totalSpent,
    'sTotalNumber'
  )}</Row>`;

  const workbook = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1F1F1F"/>
  </Style>
  <Style ss:ID="sHeader">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#C08F2E" ss:Pattern="Solid"/>
   <Alignment ss:Vertical="Center" ss:Horizontal="Left"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A37223"/>
   </Borders>
  </Style>
  <Style ss:ID="sText">
   <Alignment ss:Vertical="Center"/>
   ${CELL_BORDERS}
  </Style>
  <Style ss:ID="sCenter">
   <Alignment ss:Vertical="Center" ss:Horizontal="Center"/>
   ${CELL_BORDERS}
  </Style>
  <Style ss:ID="sCurrency">
   <Alignment ss:Vertical="Center" ss:Horizontal="Right"/>
   <NumberFormat ss:Format="#,##0"/>
   ${CELL_BORDERS}
  </Style>
  <Style ss:ID="sTotal">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#1F1F1F"/>
   <Interior ss:Color="#F3E9D7" ss:Pattern="Solid"/>
   <Alignment ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#C08F2E"/>
   </Borders>
  </Style>
  <Style ss:ID="sTotalNumber">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#1F1F1F"/>
   <Interior ss:Color="#F3E9D7" ss:Pattern="Solid"/>
   <Alignment ss:Vertical="Center" ss:Horizontal="Right"/>
   <NumberFormat ss:Format="#,##0"/>
   <Borders>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#C08F2E"/>
   </Borders>
  </Style>
 </Styles>
 <Worksheet ss:Name="Customers">
  <Table ss:ExpandedColumnCount="5" ss:ExpandedRowCount="${
    customers.length + 2
  }" x:FullColumns="1" x:FullRows="1">
   <Column ss:Index="1" ss:AutoFitWidth="0" ss:Width="180"/>
   <Column ss:Index="2" ss:AutoFitWidth="0" ss:Width="120"/>
   <Column ss:Index="3" ss:AutoFitWidth="0" ss:Width="150"/>
   <Column ss:Index="4" ss:AutoFitWidth="0" ss:Width="100"/>
   <Column ss:Index="5" ss:AutoFitWidth="0" ss:Width="150"/>
   ${headerRow}
   ${dataRows}
   ${totalRow}
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <FreezePanes/>
   <FrozenNoSplit/>
   <SplitHorizontal>1</SplitHorizontal>
   <TopRowBottomPane>1</TopRowBottomPane>
   <ActivePane>2</ActivePane>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
 </Worksheet>
</Workbook>`;

  const blob = new Blob([`\uFEFF${workbook}`], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `amros-customers-${stamp}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
