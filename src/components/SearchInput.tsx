import { FC } from 'react';
import styles from './SearchInput.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface Props {
    searchInputValue: string
    onInputChange: (e: any) => void // TODO: add type to e
    onSearchHandler: () => void
}



const SearchInput: FC<Props> = ({ searchInputValue, onInputChange, onSearchHandler }) => {
    return (
        <div className={styles['search-input-div']}>
            <div className={styles["search-input-wrapper"]}>
                <InputGroup className="mb-3">
                    <Form.Control
                        onChange={onInputChange}
                        value={searchInputValue}
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                    />
                    <Button variant="outline-secondary" id="button-addon1" onClick={onSearchHandler}>
                    🔍
                    </Button>
                </InputGroup>
            </div>
        </div>
    )
}

export default SearchInput