import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';
import {connect} from "react-redux";
import {withTranslation} from '../../localization/i18n';

//Todo: Pullout strings into resource file (Time To Hear Back, Total Savings, etc.)

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#003DA5',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        backgroundColor: 'rgba(153, 153, 153, 0.33)',
    },
}))(TableCell);

const styles = theme => ({
    root: {
        maxWidth: 1152,
        padding: 20,
        marginTop: theme.spacing(1),
        overflowX: 'auto',
        margin: '0 auto',
    },
    table: {
        width: '100%',
        border: '1px solid #EAEAEA',
        fontSize: '14px',
    },

    header: {
        fontSize: '14px',
    },

    row: {
        '&:nth-of-type(odd)': {
            // backgroundColor: theme.palette.background.default,
            backgroundColor: 'rgba(79, 79, 79, 0.26)',
        },
    },
});

// TODO: will we ever need to handle other currencies?
function ccyFormat(num) {
    return '$' + num.toFixed(2);
}

function subtotal(items) {
    return items.map(({savings}) => savings).reduce((sum, i) => sum + i, 0);
}


class EligibleProgramsTable extends React.Component {

    render() {
        const {classes, filtered_programs, t} = this.props;
        const total = subtotal(filtered_programs);

        return (
            <div className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell className={classes.header}>{t('col-1-header')}</CustomTableCell>
                            <Hidden only={['sm', 'xs']}>
                                <CustomTableCell className={classes.header} align="right">{t('col-2-header')}</CustomTableCell>
                                <CustomTableCell className={classes.header} align="right">{t('col-3-header')}</CustomTableCell>
                            </Hidden>
                            <CustomTableCell className={classes.header} align="right">{t('col-4-header')}</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered_programs.map((result) => {
                            return (
                                <TableRow className={classes.row} key={result.id}>
                                    <CustomTableCell component="th" scope="row">{result.name}</CustomTableCell>
                                    <Hidden only={['sm', 'xs']}>
                                        <CustomTableCell align="right">{result.time_hear_back}</CustomTableCell>
                                        <CustomTableCell align="right">{result.time_to_apply}</CustomTableCell>
                                    </Hidden>
                                    <CustomTableCell align="right">{ccyFormat(result.savings)}</CustomTableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <Hidden only={['sm', 'xs']}>
                                <CustomTableCell colSpan={3} align="right" className="totalRow"><span
                                    className="totalRow">{t('est-monthly-savings')}</span></CustomTableCell>
                            </Hidden>
                            <Hidden only={['xl', 'lg', 'md']}>
                                <CustomTableCell colSpan={1} align="right" className="totalRow"><span
                                    className="totalRow">{t('total-savings')}</span></CustomTableCell>
                            </Hidden>
                            <CustomTableCell align="right" className="totalRow">{ccyFormat(total)}</CustomTableCell>
                        </TableRow>
                    </TableBody>


                </Table>
            </div>
        );
    }
}

EligibleProgramsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(state => state)(withStyles(styles)(withTranslation('eligible-programs-table')(EligibleProgramsTable)));
