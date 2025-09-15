import React from 'react'
import ResponsivePaginationComponent from 'react-responsive-pagination'


interface CustomPaginationProps {
    currentPage: number
    totalPages: number
    setCurrentPage: (page: number) => void

}

const CustomPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages, setCurrentPage, }) => {
    return (
        <>
            <style>{`
     /* PAGINATION CUSTOM STYLE */

.pagination {
  justify-content: center;
  display: flex;
  padding-left: 0;
  list-style: none;
  margin: 0;
}

.page-item .page-link {
  position: relative;
  display: block;
  margin: 0 2px;
  min-height: 40px;
  min-width: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: #007bff;
  text-decoration: none;
}

.page-item .page-link:hover {
  background-color: #cccccc;
}

.page-item.active .page-link {
  font-weight: 700;
  color: #ffffff;
  background-color: #007bff;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
}

@media (prefers-color-scheme: dark) {
  .page-item .page-link {
    color: #ffffff;
  }

  .page-item .page-link:hover {
    background-color: #343a40;
  }

  .page-item.active .page-link {
    background-color: #007bff;
  }

  .page-item.disabled .page-link {
    color: #6c757d;
  }
}
      `}
            </style>
            <div className='flex justify-end py-4'>
                <ResponsivePaginationComponent
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}

                />
            </div>
        </>
    )
}

export default CustomPagination
