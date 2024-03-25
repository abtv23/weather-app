import styles from './SearchInput.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function SearchInput() {
    return (
        <div className={styles['search-input-div']}>
            <div className={styles["search-input-wrapper"]}>
                <InputGroup className="mb-3">
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                    />
                    <Button variant="outline-secondary" id="button-addon1">
                    🔍
                    </Button>
                </InputGroup>
            </div>
        </div>
    )
}