import {useState} from 'react';
import {Document, Page} from 'react-pdf';




const ArticleViewer = () => {
    const [numPages, setNumPages] = useState(2);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    return (
      <div>
        <Document document= "/timetable.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
}

export default ArticleViewer