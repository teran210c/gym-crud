import { useEffect, useState } from "react"

export default function BookCRUD() {
    const [books, setBooks] = useState([])
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [editBookId, setEditBookId] = useState(null)
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newYear, setNewYear] = useState(null)

    useEffect(() => {
        async function fetchBooks() {
            const res = await fetch("http://localhost:8080/api/books")
            const data = await res.json()
            setBooks(data)
        }
        fetchBooks()

    }, [])

    async function handleSubmit(e) {
        e.preventDefault(); // evita que el form recargue la página

        const res = await fetch("http://localhost:8080/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                author: author,
                year: year
            })
        });

        if (res.ok) {
            const data = await res.json();
            console.log("Libro creado:", data);
            setBooks(prev => [...prev, data])
            setTitle("");
            setAuthor("");
            setYear("");

        } else {
            console.error("Error al crear el libro");
        }
    }

    async function deleteBook(bookId) {
        const res = await fetch(`http://localhost:8080/api/books/${bookId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json();
        const filteredBooks = books.filter(book => {
            return book.id !== data.id
        })

        setBooks(filteredBooks)


    }

    async function editBook(bookId) {
        const res = await fetch(`http://localhost:8080/api/books/${bookId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ title: newTitle, author: newAuthor, year: newYear })
        })
        if(res.ok) {
            const updated = await res.json()
            setBooks(prev => prev.map(book => book.id === bookId ? updated : book))
            setEditBookId(null)
        }    
    }


    return (
        <div>
            <h1>Hola desde CRUD</h1>
            <form onSubmit={handleSubmit}>
                <h3>Add books</h3>
                <label> Book name:
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(prev => prev = e.target.value)}
                    />
                </label>
                <br />
                <label> Book author:
                    <input
                        type="number"
                        required
                        value={author}
                        onChange={(e) => setAuthor(prev => prev = e.target.value)}
                    />
                </label>
                <br />
                <label> Book year:
                    <input
                        type="text"
                        required
                        value={year}
                        onChange={(e) => setYear(prev => prev = e.target.value)}
                    />
                </label>
                <br />
                <input type="submit" />

            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>

                        {books.map(book => (
                            <tr key={book.id}>
                                {book.id === editBookId ?
                                    <>
                                        <td><input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} /></td>
                                        <td><input type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} /></td>
                                        <td><input type="number" value={newYear} onChange={(e) => setNewYear(e.target.value)} /></td>
                                        <td><button onClick={() => editBook(book.id)}>Submit</button><button onClick={() => setEditBookId(null)}>Cancel</button></td>
                                    </>

                                    :
                                    <>
                                        <td style={{ textAlign: "left" }}>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.year}</td>
                                        <td>
                                            <button onClick={() => {
                                                setEditBookId(book.id)
                                                setNewTitle(book.title)
                                                setNewAuthor(book.author)
                                                setNewYear(book.year)
                                            }
                                            }>
                                                Edit
                                            </button>
                                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                                        </td>
                                    </>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}