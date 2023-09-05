import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { DLT } from '../redux/actions/action'
import { useDispatch } from 'react-redux'
const Header = () => {


    const [price, setPrice] = useState(0);
    const getdata = useSelector((state) => state.cartreducer.carts);
    console.log(getdata)

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DLT(id))
    }

    const total = () => {
        let price = 0;
        getdata.map((ele, k) => {
            price = ele.price * ele.qnty + price

        });
        setPrice(price);
    }
    useEffect(() => {
        total();
    }, [total])
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" style={{ height: '60px' }}>
                <Container>
                    <NavLink to="/" className='mx-3 text-decoration-none' style={{ color: 'white' }}>Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className='text-decoration-none' style={{ color: 'white' }}>Home</NavLink>

                    </Nav>
                    <Badge badgeContent={getdata.length} color="primary"


                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>

                    </Badge>
                </Container>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    {/* Your Cart is Empty */}

                    {
                        getdata.length ?
                            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurant Name</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map((e) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>

                                                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                    <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt='' />
                                                                </NavLink>
                                                            </td>
                                                            <td>
                                                                <p>{e.rname}</p>
                                                                <p>Price :₹ {e.price}</p>
                                                                <p>Quantity :{e.qnty}</p>
                                                                <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                                    <i className='fas fa-trash smalltrash'></i>
                                                                </p>
                                                            </td>
                                                            <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                                <i className='fas fa-trash largetrash'></i>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )

                                            })
                                        }
                                        <p className='text-center'>Total :₹ {price}</p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className='cart_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: 'relative' }}>
                                <i className='fas fa-close smallclose'
                                    onClick={handleClose}
                                    style={{ position: 'absolute', top: 2, right: 20, fontSize: 23, cursor: 'pointer' }}></i>
                                <p style={{ fontSize: 22 }}>Your Cart is Empty</p>
                                <img src='./cart.gif' alt='' className='emptycard_img' style={{ width: "5rem", padding: 10 }} />
                            </div>
                    }
                </Menu>
            </Navbar>
        </div>
    )
}

export default Header
