import React, {useState} from "react";

const Search = ()=>{
    const [search,setSearch]= useState(
        {
            keyword : '',
        }
    );
    const changeHandle=(e)=>{
        const {value,name} = e.target;
        setSearch((preSearch=>({
            ...preSearch,
            [name]:value,
        })));
    }
    return(
        <>
            <form method="get" action="">
                <div className="d-flex">
                    <div className="form-group flex-grow-1">
                        <div className="search-icon fa fa-search">
                            <input className="form-control" onChange={changeHandle} name="keyword"
                                   value={search.keyword}
                                   placeholder="Search" type="text"/>
                        </div>
                    </div>
                    <input type="hidden" name="prop_status"
                           value=""/>
                    <button className="btn btn-search btn-secondary"
                            type="submit">Search
                    </button>
                </div>
            </form>
        </>
    )
}
export default Search
