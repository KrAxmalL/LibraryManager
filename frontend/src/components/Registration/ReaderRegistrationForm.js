
import { Link } from 'react-router-dom';
import classes from './ReaderRegistrationForm.module.css';

function ReaderRegistrationForm() {
    return (
        <form name="Registration">
            <div className="login">
                <div>
                    <input className={classes.input} type='email' placeholder="Email" id='email' required></input>
                </div>
                <div>
                    <input className={classes.input} type='password' placeholder="Password" id='password' required></input>
                </div>
                <div>
                    <input className={classes.input} type="text" placeholder="Name" required="" id="name" size="23"/>
                </div>
                <div>
                    <input className={classes.input} type="text" placeholder="Surname" required="" id="surname" size="23"/>
                </div>
                <div>
                <input className={classes.input} type="text" placeholder="Patronymic" required="" id="patronymic" size="23"  />
                </div>
                <div>
                    <label>Birth date:</label>
                    <input className={classes.input} type="date" placeholder="Birth date" required="" id="birth_date" size="23"/>
                </div>
                <div>
                    <input className={classes.input} type="text" placeholder="City" required="" id="city" size="23" />
                </div>
                <div>
                    <input className={classes.input} type="text" placeholder="Street" required="" id="street" size="23" />
                </div>
                <div>
                    <input className={`${classes.input} ${classes.wide}`} type="number" placeholder="Building" required="" id="building" />
                </div>
                <div>
                    <input className={`${classes.input} ${classes.wide}`} type="number" placeholder="Flat" id="flat" />
                </div>
                <div>
                    <input className={classes.input} type="text" placeholder="Work place" required="" id="work_place" size="23" />
                </div>
                 <input  className={`${classes.input} ${classes.submit}`} type="submit" value="Register" />
                 <Link className={classes.link} to='../login'>Login</Link>
            </div>
        </form>
    );
}

export default ReaderRegistrationForm;