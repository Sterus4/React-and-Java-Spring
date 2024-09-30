import {useSelector} from "react-redux";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

function MainTable(){
    const itemsRedux = useSelector((state) => state.hits.hits);

    return (
        <DataTable stripedRows removableSort paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} value={itemsRedux} showGridlines tableStyle={{ minWidth: '50rem' }}>
            <Column field="x" header="X" style={{width: '18%'}}></Column>
            <Column field="y" header="Y" style={{width: '18%'}}></Column>
            <Column field="r" sortable filter header="R" style={{width: '18%'}}></Column>
            <Column field="isHit" header="Hit" style={{width: '18%'}}></Column>
            <Column field="hitDate" header="Date" style={{}}></Column>
        </DataTable>
    )
}

export default MainTable