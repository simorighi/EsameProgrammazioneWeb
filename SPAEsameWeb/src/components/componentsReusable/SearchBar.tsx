import { useState, type FormEvent } from "react";

type Props = {
    onSearch: (city: string) => void;
};

function SearchBar({ onSearch }: Props) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed) onSearch(trimmed);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar d-flex align-items-center">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Cerca città"
                className="border-2 p-1 px-2 border-secondary"
            />
            <button type="submit" className="btn btn-primary ms-2">Cerca</button>
        </form>
    );
}

export default SearchBar;
