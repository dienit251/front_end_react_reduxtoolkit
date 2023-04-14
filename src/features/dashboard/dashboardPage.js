import moment from 'moment';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from './dashboard.module.css';
import { fetchDataDashboard } from './dashboardSlice';
import Loading from '../../components/loading';
import 'chart.js/auto';
import { Doughnut, Bar } from 'react-chartjs-2';
import { barChartOptions, buildDataChart, buildDataColumnChart, doughnutChartOptions } from '../../components/charts/chartBuilder';

function DashboardPage() {
    console.log(doughnutChartOptions);
    const today = moment().format('DD/MM/YYYY');
    const month = moment().format('MM/YYYY');
    const dispatch = useDispatch();
    const dataField = useSelector(state => state.dashboard.dataField);
    const dataContract = useSelector(state => state.dashboard.dataContract);
    const dataColumn = useSelector(state => state.dashboard.dataColumn);

    console.log(dataColumn);

    useEffect(() => {
        dispatch(fetchDataDashboard());
    }, []);

    if (!dataField || !dataContract || !dataColumn) {
        return <Loading />
    } else {
        const dataFieldChart = buildDataChart([dataField.visited, dataField.not_yet_visit], ['FC visited', 'FC not yet visit']);
        const dataContractChart = buildDataChart([dataContract.visited, dataContract.not_yet_visit], ['Contract visited', 'Contract not yet visit']);
        const dataColumnChart = buildDataColumnChart(dataColumn.map(x => x['count']), dataColumn.map(x => x['date']));
        console.log(dataColumnChart);
        return (
            <div className={styles.childContainer}>
                {/*field visit board */}
                <Row className={styles.titleRow}>
                    <Col md={2} className={styles.titleCol}>FIELD VISIT BOARD</Col>
                    <Col md={10}></Col>
                </Row>
                <Row>
                    <Col md={2} className={styles.generalCol} style={{ fontWeight: 'bold' }}>Today {today}</Col>
                </Row>
                <Row>
                    <Col md={2} className={styles.boxContainer}>
                        <div className={styles.box}>
                            <h2>{dataField.total}</h2>
                            Total FC
                        </div>
                    </Col>
                    <Col md={2} className={styles.boxContainer}>
                        <div className={styles.box}>
                            <h2 style={{ color: 'var(--blue-color)' }}>{dataField.visited}</h2>
                            FC Visited
                        </div>
                    </Col>
                    <Col md={2} className={styles.boxContainer}>
                        <div className={styles.box}>
                            <h2 style={{ color: 'var(--secondary-color)' }}>{dataField.not_yet_visit}</h2>
                            FC Not yet visit
                        </div>
                    </Col>
                    <Col md={2}></Col>
                    <Col md={4} className={styles.pieContainer}>
                        {/* <MyDoughnutChart data={dataFieldChart} /> */}
                        <Doughnut
                            data={dataFieldChart}
                            options={doughnutChartOptions()} />
                    </Col>
                </Row>

                {/*contract visit board */}
                <Row className={styles.titleRow}>
                    <Col md={2} className={styles.titleCol}>CONTRACT VISIT BOARD</Col>
                    <Col md={10}></Col>
                </Row>
                <Row>
                    <Col md={2} className={styles.generalCol} style={{ fontWeight: 'bold' }}>Month {month}</Col>
                </Row>
                <Row>
                    <Col md={2} className={styles.boxContainer}>
                        <div className={styles.box}>
                            <h2>{dataContract.total}</h2>
                            Total contracts
                        </div>
                    </Col>
                    <Col md={2} className={styles.boxContainer}>
                        <div className={styles.box}>
                            <h2 style={{ color: 'var(--blue-color)' }}>{dataContract.visited}</h2>
                            Contract visited
                        </div>
                    </Col>
                    <Col md={2} className={styles.boxContainer}>
                        <div className={styles.box}>
                            <h2 style={{ color: 'var(--secondary-color)' }}>{dataContract.not_yet_visit}</h2>
                            Contract not yet visit
                        </div>
                    </Col>
                    <Col md={2} className={styles.boxContainer}>
                        <div className={styles.box}>
                            <h2 style={{ color: 'var(--green-color)' }}>{dataContract.paid}</h2>
                            Contract paid
                        </div>
                    </Col>
                    <Col md={4} className={styles.pieContainer}>
                        <Doughnut
                            data={dataContractChart}
                            options={doughnutChartOptions()} />
                    </Col>
                </Row>
                <Row>
                    <Bar data={dataColumnChart} options={barChartOptions()} height={"65%"} />
                </Row>
            </div >
        )
    }
}



export default DashboardPage;