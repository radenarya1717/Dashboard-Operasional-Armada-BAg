document.addEventListener('DOMContentLoaded', () => {
    // Current time: Wednesday, November 13, 2025 at 9:52:32 AM WIB.

    // === DATA MASTER (Disesuaikan berdasarkan Daily Report 12 November 2025) ===

    // Daftar Agen (Genco yang muncul di laporan)
    const ALL_AGENTS = [
        'PT. Adhi Guna Putera Cabang Nagan Raya',
        'PT. Adhi Guna Putera Cabang Banten',
        'PT. Adhi Guna Putera Cabang Padang',
        'PT. Adhi Guna Putera Cabang Balikpapan',
        'PT. Adhi Guna Putera Cabang Banjarmasin',
        'PT. Adhi Guna Putera Cabang Cilacap',
        'PT. Adhi Guna Putera Cabang Jawa Barat',
        'PT. Adhi Guna Putera Cabang Pacitan',
        'PT. Adhi Guna Putera Cabang Paiton',
        'PT. Adhi Guna Putera Cabang Panjang',
        'PT. Adhi Guna Putera Cabang Rembang',
        'PT. Adhi Guna Putera Cabang Tuban',
        'PT. Adhi Guna Putera Perwakilan Pratu',
        'PT. Adhi Guna Putera Cabang Belawan',
        'PT. Agency Pelayaran Indonesia',
        'PT. BUL',
        'PT. IDT Trans Agency',
        'PT. Jaya Pandu Maritim',
        'PT. Niaga Lautan Indah',
        'PT. Pelni',
        'PT. Riandy Fiesta Samudera',
        'PT. Sinar Laut Maritim',
        'PT. Trans Samudera Armada',
        'PT. IDT Trans Agency',
        'PT. Samudera Makmur Agency',
        'PT. Philhua'
    ];

    // Daftar Lokasi (Lokasi saat ini dan Next Shipment dari laporan)
    const ALL_LOCATIONS = [
        'Tarahan', 'Suralaya', 'Lubuk Tutung', 'Tanjung Jati', 'Muara Berau', 'Balikpapan', 'Paiton',
        'Nagan Raya', 'Gresik', 'Lombok', 'Tanjung Bara', 'Taboneo', 'Cilacap', 'Muara Jawa',
        'Morowali', 'Muara Sampit', 'Morosi', 'Pacitan', 'Tarakan', 'Bontang', 'Teluk Bayur', 'Kupang',
        // Lokasi baru dari Daily Report
        'Manokwari', 'Suralaya 1-7', 'Paiton PEC', 'Tanjung Merpati', 'Karang Jamuang', 'Pangkalan Susu',
        'IBT', 'Tenayan', 'Asam-asam', 'Teluk Seih', 'Lontar', 'Palembang', 'Jawa 9-10', 'Rembang',
        'Labuan', 'KTU Sagulung', 'Salino', 'ITP Tarjun', 'Samarinda', 'Tidore', 'Sulut', 'Timor',
        'Kutai', 'Timor 1', 'Suralaya Baru', 'Paiton 1-2', 'Bunati', 'Tanjung Awar-awar', 'Ombilin',
        'Palu 3', 'Muara Pahu', 'Senyiur', 'Kalbim 4', 'Sel Putting', 'Jeneponto', 'SMI Bojonegara'
    ];

    // Data Muatan Terbanyak (Diambil dari kapal yang memiliki muatan dan posisinya di laporan)
    const LOAD_DATA = [
        { ship: 'MV. Adhiguna Tarahan', load: 10200, color: '#b91c1c' }, // Cargo 10.200 MT
        { ship: 'MV. Zalecha Baruna', load: 55000, color: '#dc2626' }, // Cargo 55.000 MT
        { ship: 'MV Rama Baruna', load: 50000, color: '#f87171' }, // Cargo 50.000 MT
        { ship: 'MV Malahayati Baruna', load: 52349, color: '#fca5a5' }, // Cargo 52.349 MT
        { ship: 'MV Latifah Baruna', load: 43508, color: '#fecaca' }, // Cargo 43.508 MT
    ];

    const TOP_ROUTES_DATA = [
        { name: 'Suralaya', count: 15, color: '#059669' },
        { name: 'Tarahan', count: 12, color: '#10b981' },
        { name: 'Paiton', count: 9, color: '#34d399' },
        { name: 'Muara Berau', count: 7, color: '#6ee7b7' },
        { name: 'Tanjung Jati', count: 5, color: '#a7f3d0' },
    ];

    const TOP_AGENTS_DATA = [
         { name: 'PT. Pelni', count: 15 }, 
        { name: 'PT. Adhi Guna Putera', count: 10 }, 
        { name: 'PT. Riandy Fiesta Samudeta', count: 2 },
        { name: 'PT. IDT Trans Agency', count: 1 },
        { name: 'PT. Trans Samudera Armada', count: 1 },
    ];


    // === DATA KAPAL AKTIF DETAIL (Diperbarui untuk menyertakan nextPort) ===
    const ACTIVE_SHIPS_DETAIL = [
        { name: 'MV. Adhiguna Tarahan', type: 'Vessel', status: 'Discharge', location: 'Suralaya', load: 8423, statusColor: 'red-700', route: 'Tarahan - Suralaya', nextPort: 'Tarahan (Loading)' },
        { name: 'MV. Sartika Baruna', type: 'Vessel', status: 'Anchor', location: 'Tarahan', load: 0, statusColor: 'green-700', route: 'Tarahan - Suralaya', nextPort: 'Suralaya (Discharge)' },
        { name: 'MV Arimbi Baruna', type: 'Vessel', status: 'Anchor', location: 'Muara Berau', load: 0, statusColor: 'green-700', route: 'Muara Berau - Tg. Jati', nextPort: 'Tg. Jati (Discharge)' },
        { name: 'MV. Kencana Baruna', type: 'Vessel', status: 'Sailing', location: 'Bontang (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Bontang - Tg. Jati', nextPort: 'Bontang (Loading)' },
        { name: 'MV Kartika Baruna', type: 'Vessel', status: 'Anchor', location: 'Bontang', load: 0, statusColor: 'green-700', route: 'Bontang - Tanjung Jati', nextPort: 'Tanjung Jati (Discharge)' },
        { name: 'MV Martha Baruna', type: 'Vessel', status: 'Sailing', location: 'Balikpapan (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Balikpapan - Paiton', nextPort: 'Balikpapan (Loading)' },
        { name: 'MV Meutia Baruna', type: 'Vessel', status: 'Loading', location: 'Tarahan', load: 9600, statusColor: 'yellow-700', route: 'Tarahan - Paiton', nextPort: 'Paiton (Discharge)' },
        { name: 'MV Intan Baruna', type: 'Vessel', status: 'Discharge', location: 'Nagan Raya', load: 18655, statusColor: 'red-700', route: 'Muara Sabak - Nagan Raya', nextPort: 'Muara Sabak (Loading)' },
        { name: 'MV Jayanti Baruna', type: 'Vessel', status: 'Sailing', location: 'Gresik (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Gresik - Lombok', nextPort: 'Lombok (Discharge)' },
        { name: 'MV. Zalecha Baruna', type: 'Vessel', status: 'Discharge', location: 'Manokwari', load: 32298, statusColor: 'red-700', route: 'Taboneo - Manokwari', nextPort: 'Taboneo (Loading)' },
        { name: 'MV Rasuna Baruna', type: 'Vessel', status: 'Discharge', location: 'Suralaya 1-7', load: 42109, statusColor: 'red-700', route: 'Tarahan - Suralaya 1-7', nextPort: 'Tarahan (Loading)' },
        { name: 'MV Malahayali Baruna', type: 'Vessel', status: 'Discharge', location: 'Cilacap', load: 33509, statusColor: 'red-700', route: 'Bengkulu - Cilacap', nextPort: 'Bengkulu (Loading)' },
        { name: 'MV Latifah Baruna', type: 'Vessel', status: 'Discharge', location: 'Paiton', load: 40597, statusColor: 'red-700', route: 'Tanjung Bara - Paiton PEC', nextPort: 'Tanjung Bara (Loading)' },
        { name: 'MV. Lumoso Raya', type: 'Vessel', status: 'Anchor', location: 'Tanjung Merpati', load: 50000, statusColor: 'green-700', route: 'Muara Jawa - Tanjung Merpati', nextPort: 'Tanjung Merpati (Discharge)' },
        { name: 'MV. Prima Sentosa', type: 'Vessel', status: 'Anchor', location: 'Karang Jamuang (Bunker)', load: 50000, statusColor: 'green-700', route: 'Muara Sampit - Morosi', nextPort: 'Morosi (Discharge)' },
        { name: 'MV Ammar', type: 'Vessel', status: 'Sailing', location: 'Morosi (Dalam Pelayaran)', load: 48000, statusColor: 'blue-700', route: 'Taboneo - Morosi', nextPort: 'Morosi (Discharge)' },
        { name: 'MV. Prima Sejahtera', type: 'Vessel', status: 'Sailing', location: 'Pangkalan Susu (Dalam Pelayaran)', load: 50000, statusColor: 'blue-700', route: 'Tarahan - Pangkalan Susu', nextPort: 'Pangkalan Susu (Discharge)' },
        { name: 'MV AGP Kartini', type: 'Vessel', status: 'Anchor', location: 'IBT', load: 0, statusColor: 'green-700', route: 'IBT - Bahudopi', nextPort: 'Bahudopi (Discharge)' },
        { name: 'MV. Samudera Sakti III', type: 'Vessel', status: 'Discharge', location: 'Tenayan', load: 3321, statusColor: 'red-700', route: 'Tarahan - Tenayan', nextPort: 'Tarahan (Loading)' },
        { name: 'MV. Kartika Samudra', type: 'Vessel', status: 'Discharge', location: 'Tanjung Jati', load: 26657, statusColor: 'red-700', route: 'Tanjung Bara - Tanjung Jati', nextPort: 'Tanjung Bara (Loading)' },
        { name: 'MV Karunia Gemilang', type: 'Vessel', status: 'Anchor', location: 'Asam-asam', load: 0, statusColor: 'green-700', route: 'Muara Berau - Tanjung Jati', nextPort: 'Tanjung Jati (Discharge)' },
        { name: 'MV Lumoso Pratama', type: 'Vessel', status: 'Sailing', location: 'Tanjung Jati (Dalam Pelayaran)', load: 67000, statusColor: 'blue-700', route: 'Bontang - Tanjung Jati', nextPort: 'Tanjung Jati (Discharge)' },
        { name: 'MV. Bulk Batavia', type: 'Vessel', status: 'Dry Dock', location: 'Bojonegara', load: 0, statusColor: 'gray-700', route: 'Docking at Bojonegara SMI', nextPort: 'Bojonegara SMI (Dry Dock)' },
        { name: 'TB SB 2001/BG BP 3001', type: 'Tugboat/Barge', status: 'Discharge', location: 'Teluk Sirih', load: 7216, statusColor: 'red-700', route: 'Tarahan - Teluk Sirih', nextPort: 'Tarahan (Loading)' },
        { name: 'TB SB 2002/BG BP 3003', type: 'Tugboat/Barge', status: 'Sailing', location: 'Tarahan (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Tarahan - Lontar', nextPort: 'Lontar (Discharge)' },
        { name: 'TB SB 2003/BG BP 3007', type: 'Tugboat/Barge', status: 'Sailing', location: 'Suralaya (Dalam Pelayaran)', load: 7400, statusColor: 'blue-700', route: 'Tarahan - Suralaya', nextPort: 'Suralaya (Discharge)' },
        { name: 'TB SB 2004/BG 3008', type: 'Tugboat/Barge', status: 'Anchor', location: 'Palembang', load: 0, statusColor: 'green-700', route: 'Palembang - Lontar', nextPort: 'Lontar (Discharge)' },
        { name: 'TB SB 2401/BG 3301', type: 'Tugboat/Barge', status: 'Anchor', location: 'Tarahan', load: 0, statusColor: 'green-700', route: 'Tarahan - Jawa 9/10', nextPort: 'Jawa 9/10 (Discharge)' },
        { name: 'TB SB 2402/BG BP 3302', type: 'Tugboat/Barge', status: 'Anchor', location: 'Bojonegara', load: 0, statusColor: 'green-700', route: 'Tarahan - Suralaya Baru', nextPort: 'Tarahan (Loading)' },
        { name: 'TB SB 2201/BG 3004', type: 'Tugboat/Barge', status: 'Discharge', location: 'Pangkalan Susu', load: 7506, statusColor: 'red-700', route: 'Tarahan - Pangkalan Susu', nextPort: 'Tarahan (Loading)' },
        { name: 'TB SB 2202 BG BP 3005', type: 'Tugboat/Barge', status: 'Sailing', location: 'Palembang (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Palembang - Lontar', nextPort: 'Lontar (Discharge)' },
        { name: 'TB SB 2203 BP 3006', type: 'Tugboat/Barge', status: 'Sailing', location: 'Pangkalan Susu (Dalam Pelayaran)', load: 7505, statusColor: 'blue-700', route: 'Tarahan - Pangkalan Susu', nextPort: 'Pangkalan Susu (Discharge)' },
        { name: 'TB SB 2204/BP 3303', type: 'Tugboat/Barge', status: 'Anchor', location: 'Tarahan', load: 0, statusColor: 'green-700', route: 'Tarahan - Jawa 9/10', nextPort: 'Jawa 9/10 (Discharge)' },
        { name: 'TB SB 2205/BP 3304', type: 'Tugboat/Barge', status: 'Anchor', location: 'Tarahan', load: 0, statusColor: 'green-700', route: 'Tarahan - Rembang', nextPort: 'Rembang (Discharge)' },
        { name: 'TB SB 2206/ 3305', type: 'Tugboat/Barge', status: 'Anchor', location: 'Tarahan', load: 0, statusColor: 'green-700', route: 'Tarahan - Labuan', nextPort: 'Labuan (Discharge)' },
        { name: 'TB SB 2207/BP 3308', type: 'Tugboat/Barge', status: 'Sailing', location: 'KTU Sagulung', load: 0, statusColor: 'blue-700', route: 'Tarahan - Lontar', nextPort: 'Lontar (Discharge)' },
        { name: 'TB. Bintang Laut 165/BG Chandra 305', type: 'Tugboat/Barge', status: 'Sailing', location: 'Salino (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Salino - ITP Tarjun', nextPort: 'ITP Tarjun (Discharge)' },
        { name: 'TB. Bintang Laut 166/BG Chandra 302', type: 'Tugboat/Barge', status: 'Anchor', location: 'Samarinda', load: 0, statusColor: 'green-700', route: 'Samarinda - Tidore', nextPort: 'Tidore (Discharge)' },
        { name: 'TB. Pancaran 813/BG PST 813', type: 'Tugboat/Barge', status: 'Sailing', location: 'Samarinda (Agrounded)', load: 7305, statusColor: 'blue-700', route: 'Samarinda - Sulut', nextPort: 'Sulut (Discharge)' },
        { name: 'TB. Pancaran 712/BG. PST 610', type: 'Tugboat/Barge', status: 'Discharge', location: 'Timor', load: 7325, statusColor: 'red-700', route: 'Samarinda - Timor', nextPort: 'Samarinda (Loading)' },
        { name: 'TB. Pancaran 1312/BG PST 1312', type: 'Tugboat/Barge', status: 'Sailing', location: 'Timor 1 (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Kutai - Timor 1', nextPort: 'Timor 1 (Discharge)' },
        { name: 'TB. Pancaran 512/BG PST 215', type: 'Tugboat/Barge', status: 'Anchor', location: 'Tarahan', load: 0, statusColor: 'green-700', route: 'Tarahan - Rembang', nextPort: 'Tarahan (Loading)' },
        { name: 'TB Nusa BG Cakrawala V 2022', type: 'Tugboat/Barge', status: 'Sailing', location: 'Suralaya Baru (Dalam Pelayaran)', load: 10005, statusColor: 'blue-700', route: 'Tarahan - Suralaya Baru', nextPort: 'Suralaya Baru (Discharge)' },
        { name: 'TB Nusa XIV 2023 BG Cakrawala XVIII 2023', type: 'Tugboat/Barge', status: 'Sailing', location: 'Tarahan (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Tarahan - Jawa 9/10', nextPort: 'Jawa 9/10 (Discharge)' },
        { name: 'TB. BGM 01/BG. Cakrawala 0 2023', type: 'Tugboat/Barge', status: 'Discharge', location: 'Suralaya Baru', load: 10007, statusColor: 'red-700', route: 'Tarahan - Suralaya Baru', nextPort: 'Tarahan (Loading)' },
        { name: 'TB Nusa XII 2023/BG Cakrawala XVI 2023', type: 'Tugboat/Barge', status: 'Anchor', location: 'Paiton', load: 10011, statusColor: 'green-700', route: 'Tarahan - Paiton 1-2', nextPort: 'Paiton 1-2 (Discharge)' },
        { name: 'TB. AH 2018 BG Cakrawala VI', type: 'Tugboat/Barge', status: 'Anchor', location: 'Labuan', load: 10023, statusColor: 'green-700', route: 'Tarahan - Labuan', nextPort: 'Labuan (Discharge)' },
        { name: 'TB. Pancaran 212/BG PST 213', type: 'Tugboat/Barge', status: 'Sailing', location: 'Paiton (Dalam Pelayaran)', load: 10003, statusColor: 'blue-700', route: 'Tarahan - Paiton', nextPort: 'Paiton (Discharge)' },
        { name: 'TB. Libert 5/BG Azamara 033', type: 'Tugboat/Barge', status: 'Anchor', location: 'Bunati', load: 0, statusColor: 'green-700', route: 'Bunati - Tanjung Awar-awar', nextPort: 'Tanjung Awar-awar (Discharge)' },
        { name: 'TB Liberty 9/BG. Azames 3032', type: 'Tugboat/Barge', status: 'Sailing', location: 'Tarahan (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Tarahan - Ombilin', nextPort: 'Ombilin (Discharge)' },
        { name: 'TB Nusa VIII 2022/BG. EVE 088 2019', type: 'Tugboat/Barge', status: 'Sailing', location: 'Samarinda (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Muara Pahu - Palu 3', nextPort: 'Palu 3 (Discharge)' },
        { name: 'TB NUSA/BG. ANT 989 2019', type: 'Tugboat/Barge', status: 'Sailing', location: 'Palembang (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Palembang - Suralaya Baru', nextPort: 'Suralaya Baru (Discharge)' },
        { name: 'TB Nusa XIX 2023 BG ANT 98 2019', type: 'Tugboat/Barge', status: 'Sailing', location: 'Samarinda (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Samarinda - Timor', nextPort: 'Timor (Discharge)' },
        { name: 'TB Nusa XXI 2023/BG. ASR', type: 'Tugboat/Barge', status: 'Discharge', location: 'Palu 3', load: 7303, statusColor: 'red-700', route: 'Senyiur - Palu 3', nextPort: 'Senyiur (Loading)' },
        { name: 'TB. AH 98 2022/BG. ANT 888 2010', type: 'Tugboat/Barge', status: 'Sailing', location: 'Kupang (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Senyiur - Kupang', nextPort: 'Kupang (Discharge)' },
        { name: 'TB NUSA VII 2022/BG EVE 999 2010', type: 'Tugboat/Barge', status: 'Anchor', location: 'Samarinda', load: 7303, statusColor: 'green-700', route: 'Senyiur - Paiton', nextPort: 'Paiton (Discharge)' },
        { name: 'TB NUSA IX 2022/BG PTR', type: 'Tugboat/Barge', status: 'Sailing', location: 'Samarinda (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Samarinda - Kalbim 4', nextPort: 'Kalbim 4 (Discharge)' },
        { name: 'TB. BGM 07 2022/BG. EVE 798 2019', type: 'Tugboat/Barge', status: 'Sailing', location: 'Sel Putting (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Sel Putting - Jeneponto', nextPort: 'Jeneponto (Discharge)' },
        { name: 'TB NUSA XXII 2023 BG MKH', type: 'Tugboat/Barge', status: 'Sailing', location: 'Samarinda (Dalam Pelayaran)', load: 7400, statusColor: 'blue-700', route: 'Samarinda - Tidore', nextPort: 'Tidore (Discharge)' },
        { name: 'TB NUSA XXXV 2024 BG. CAKRAWALA XXXV 2024', type: 'Tugboat/Barge', status: 'Sailing', location: 'Salino (Dalam Pelayaran)', load: 0, statusColor: 'blue-700', route: 'Salino - ITP Tarjun', nextPort: 'ITP Tarjun (Discharge)' }
    ];
    
    // Semua kapal dari data master (digunakan hanya untuk KPI modal)
    const TUG_BARGE_MILIK = ['TB SB 2001/BG BP 3001', 'TB. SB 2002/BG. BP 3003', 'TB SB 2003/BG BP 3007', 'TB SB 2004/BG 3008', 'TB SB 2401/BG.3301', 'TB. SB 2402/BG BP 3302', 'TB SB 2201/BG 3004', 'TB SB 2202 BG. BP 3005', 'TB SB. 2203 BG. BP 3006', 'TB. SB. 2204/BP 3303', 'TB SB 2205/BP 3304', 'TB SB. 2206/ 3305', 'TB SB 2207/BP 3308'];
    const TUG_BARGE_TC = ['TB. Bintang Laut 165/BG Chandra 305', 'TB. Bintang Laut 166/BG Chandra 302', 'TB. Pancaran 813/BG PST 813', 'TB. Pancaran 712/BG. PST 610', 'TB. Pancaran 1312/BG PST 1312', 'TB. Pancaran 512/BG PST 215', 'TB Nusa BG Cakrawala V 2022', 'TB Nusa XIV 2023 BG Cakrawala XVIII 2023', 'TB. BGM 01/BG. Cakrawala 0 2023', 'TB Nusa XII 2023/BG Cakrawala XVI 2023', 'TB. AH 2018/BG Cakrawala VI', 'TB. Pancaran 212/BG. PST 213', 'TB. Liberty 5/BG Azamara 033', 'TB Liberty 9/BG. Azames 3032', 'TB Nusa VIII 2022/BG. EVE 088 2019', 'TB NUSA/BG. ANT 989 2019', 'TB Nusa XIX 2023/BG ANT 98 2019', 'TB Nusa XXI 2023/BG. ASR', 'TB. AH 98 2022/BG. ANT 888 2019', 'TB NUSA VII 2022/BG EVE 999 2019', 'TB NUSA IX 2022/BG PTR', 'TB. BGM 07 2022/BG. EVE 798 2019', 'TB NUSA XXII 2023/BG MKR', 'TB NUSA XXXV 2024/BG. CAKRAWALA XXXV 2024'];
    const VESSEL_MILIK = ['MV. Adhiguna Tarahan', 'MV. Sartika Baruna', 'MV Arimbi Baruna', 'MV. Kencana Baruna', 'MV Kartika Baruna', 'MV Martha Baruna', 'MV Meutia Baruna', 'MV Intan Baruna', 'MV Jayanti Baruna', 'MV. Zalecha Baruna', 'MV Rama Baruna', 'MV Malahayali Baruna', 'MV Latifah Baruna'];
    const VESSEL_TC = ['MV. Lumoso Raya', 'MV. Prima Sentosa', 'MV Ammar', 'MV. Prima Sejahtera', 'MV AGP Kartini', 'MV. Samudera Sakti III', 'MV. Kartika Samudra', 'MV Karunia Gemilang', 'MV Lumoso Pratama', 'MV. Bulk Batavia'];


    // === KOMPUTASI & HELPER ===
    const TOTAL_TUGBOATS = TUG_BARGE_MILIK.length + TUG_BARGE_TC.length;
    const TOTAL_VESSELS = VESSEL_MILIK.length + VESSEL_TC.length;
    const TOTAL_SHIPS = TOTAL_TUGBOATS + TOTAL_VESSELS;

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // === UPDATE KPI ===
    const updateKPIs = () => {
        document.getElementById('total-ships-kpi').textContent = TOTAL_SHIPS;
        document.getElementById('total-tugboats-kpi').textContent = TOTAL_TUGBOATS;
        document.getElementById('total-vessels-kpi').textContent = TOTAL_VESSELS;
        document.getElementById('total-agents-kpi').textContent = ALL_AGENTS.length;
        document.getElementById('total-routes-kpi').textContent = ALL_LOCATIONS.length;
        // Menggunakan jumlah kapal AKTIF saja di bagian Armada Aktif
        document.getElementById('total-ships-count').textContent = ACTIVE_SHIPS_DETAIL.length;
    };

    // --- LOGIC MODAL KPI (MODAL LAMA) ---
    const modal = document.getElementById('ship-names-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalShipList = document.getElementById('modal-ship-list');

    const closeModal = () => {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 300);
    };
    window.closeModal = closeModal;

    const showShipNamesModal = (type) => {
        // Logika modal KPI lama (tetap sama)
        // ... (kode showShipNamesModal yang sudah ada)
        let sections = [];
        let title = '';

        if (type === 'tugboat') {
            title = 'Daftar Tugboat';
            sections = [
                { title: 'Tugboat Milik', data: TUG_BARGE_MILIK },
                { title: 'Tugboat TC', data: TUG_BARGE_TC }
            ];
        } else if (type === 'vessel') {
            title = 'Daftar Vessel';
            sections = [
                { title: 'Vessel Milik', data: VESSEL_MILIK },
                { title: 'Vessel TC', data: VESSEL_TC }
            ];
        } else if (type === 'agent') {
            title = 'Daftar Semua Genco/Agen';
            sections = [
                { title: `Total ${ALL_AGENTS.length} Agen`, data: ALL_AGENTS }
            ];
        } else if (type === 'route') {
            title = 'Daftar Semua Rute / Lokasi';
            sections = [
                { title: `Total ${ALL_LOCATIONS.length} Rute/Lokasi`, data: ALL_LOCATIONS }
            ];
        } else if (type === 'all') {
            title = 'Semua Kapal';
            sections = [
                { title: 'Kapal Milik', data: [...TUG_BARGE_MILIK, ...VESSEL_MILIK] },
                { title: 'Kapal TC', data: [...TUG_BARGE_TC, ...VESSEL_TC] }
            ];
        } else {
            return;
        }

        modalTitle.textContent = title;
        modalShipList.innerHTML = '';

        sections.forEach(section => {
            const header = document.createElement('h4');
            header.className = 'font-bold text-primary mt-4 mb-2';
            header.textContent = section.title;
            modalShipList.appendChild(header);

            section.data.forEach(name => {
                const li = document.createElement('li');
                const isAgentOrRoute = type === 'agent' || type === 'route';
                li.className = isAgentOrRoute
                    ? 'p-2 bg-green-50 rounded-lg border-l-4 border-green-500 font-medium hover:bg-green-100'
                    : 'p-2 bg-gray-50 rounded-lg border-l-4 border-accent font-medium hover:bg-gray-100';
                li.textContent = name;
                modalShipList.appendChild(li);
            });
        });

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.replace('opacity-0', 'opacity-100'), 10);
    };


    // --- LOGIC MODAL DETAIL KAPAL AKTIF (MODAL BARU) ---
    const detailModal = document.getElementById('active-ship-detail-modal');

    /**
     * Menutup Modal Detail Kapal Aktif
     */
    const closeDetailModal = () => {
        detailModal.classList.remove('opacity-100');
        detailModal.classList.add('opacity-0');
        setTimeout(() => detailModal.classList.add('hidden'), 300);
    };
    window.closeDetailModal = closeDetailModal; // Export ke global agar bisa diakses dari HTML

    /**
     * Menampilkan Modal Detail Kapal Aktif
     * @param {Object} shipData - Objek data kapal yang akan ditampilkan.
     */
    const openShipDetailModal = (shipData) => {
        document.getElementById('detail-ship-name').textContent = shipData.name;
        document.getElementById('detail-ship-type').textContent = shipData.type;
        document.getElementById('detail-ship-route').textContent = shipData.route;
        document.getElementById('detail-ship-load').textContent = `${formatNumber(shipData.load)} Ton`;
        
        // Logika Status
        const statusText = shipData.status;
        const statusColorClass = shipData.statusColor.replace('-700', '-500'); // Ambil warna dasar
        document.getElementById('detail-ship-status').innerHTML = `
            <span class="inline-block h-3 w-3 rounded-full bg-${statusColorClass.split('-')[0]}-500 mr-2"></span>
            <span class="text-${shipData.statusColor}">${statusText}</span>
        `;
        
        // Menampilkan Next Port
        document.getElementById('detail-ship-next-port').textContent = shipData.nextPort;

        detailModal.classList.remove('hidden');
        setTimeout(() => detailModal.classList.replace('opacity-0', 'opacity-100'), 10);
    };


    // === CHART LOGIC (Tetap Sama) ===
    const initLoadChart = () => {
        const ctx = document.getElementById('loadChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: LOAD_DATA.map(d => d.ship),
                datasets: [{
                    label: 'Muatan (Ton)',
                    data: LOAD_DATA.map(d => d.load),
                    backgroundColor: LOAD_DATA.map(d => d.color),
                    borderRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += formatNumber(context.parsed.x) + ' Ton';
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Muatan (Ton)',
                            color: '#b91c1c'
                        },
                        ticks: {
                            callback: function(value) {
                                return formatNumber(value);
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    };

    const initAgentChart = () => {
        const ctx = document.getElementById('agentChart').getContext('2d');

        const labels = TOP_AGENTS_DATA.map(item => item.name.split('(')[0].trim());
        const counts = TOP_AGENTS_DATA.map(item => item.count);

        const backgroundColors = [
            '#b91c1c',
            '#dc2626',
            '#f87171',
            '#fca5a5',
            '#fecaca'
        ];

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Jumlah Kapal (T/B + Vessel)',
                    data: counts,
                    backgroundColor: backgroundColors.slice(0, counts.length),
                    borderColor: '#b91c1c',
                    borderWidth: 1,
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += new Intl.NumberFormat('id-ID').format(context.raw) + ' Kapal';
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Jumlah Kapal (T/B + Vessel)',
                            font: { weight: '600' }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                if (Number.isInteger(value)) {
                                    return value;
                                }
                                return formatNumber(value);
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: true,
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });
    };

    const initTopRouteChart = () => {
        const ctx = document.getElementById('routeChart').getContext('2d');

        const labels = TOP_ROUTES_DATA.map(item => item.name);
        const counts = TOP_ROUTES_DATA.map(item => item.count);

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Jumlah Pengiriman',
                    data: counts,
                    backgroundColor: TOP_ROUTES_DATA.map(item => item.color),
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1) + '%';
                                return `${label}: ${value} Pengiriman (${percentage})`;
                            }
                        }
                    }
                },
                layout: {
                    padding: 10
                }
            }
        });
    };


    // === SHIP LIST RENDERING (Disesuaikan) ===
    const renderShipListSim = () => {
        const shipListContainer = document.getElementById('ship-list');
        const placeholder = document.getElementById('ship-list-placeholder');

        if (placeholder) {
            placeholder.classList.add('hidden');
        }

        shipListContainer.innerHTML = ''; // Hapus konten sebelumnya

        ACTIVE_SHIPS_DETAIL.forEach(data => {
            const statusColor = data.statusColor.split('-')[0]; // Ambil 'red', 'blue', 'green', 'yellow'
            
            const card = document.createElement('div');
            card.className = 'ship-list-item p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition duration-150 cursor-pointer';

            // **Tambahkan Event Listener di sini**
            card.addEventListener('click', () => {
                openShipDetailModal(data);
            });

            card.innerHTML = `
                <p class="text-base font-bold text-primary truncate">${data.name.split('/')[0].trim()}</p>
                <p class="text-xs text-gray-500 mt-1 uppercase">${data.type} - Rute: ${data.route}</p>
                
                <div class="flex items-center text-sm font-medium mt-2">
                    <span class="inline-block h-3 w-3 rounded-full bg-${statusColor}-500 mr-2"></span>
                    <span class="text-${data.statusColor}">${data.status}</span>
                </div>
                
                <p class="text-xs font-semibold text-gray-600 mt-2">Next Port: <span class="text-accent">${data.nextPort}</span></p>
            `;
            shipListContainer.appendChild(card);
        });
    };


    // === HIDE LOADING AND SHOW DASHBOARD ===
    const hideLoadingAndShowDashboard = () => {
        const loadingOverlay = document.getElementById('loading-overlay');
        const dashboardContainer = document.getElementById('dashboard-container');

        if (dashboardContainer) {
            dashboardContainer.classList.remove('hidden');
        }

        if (loadingOverlay) {
            loadingOverlay.classList.add('opacity-0', 'transition-opacity', 'duration-500');

            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 500);
        }

        const authStatus = document.getElementById('auth-status');
        if (authStatus) {
            authStatus.textContent = 'Auth Status: Connected (Data per 12 Nov 2025)';
            authStatus.classList.remove('text-gray-400');
            authStatus.classList.add('text-green-500', 'font-semibold');
        }
    };

    // === EVENT LISTENER KPI ===
    document.getElementById('kpi-total-ships').addEventListener('click', () => showShipNamesModal('all'));
    document.getElementById('kpi-total-tugboats').addEventListener('click', () => showShipNamesModal('tugboat'));
    document.getElementById('kpi-total-vessels').addEventListener('click', () => showShipNamesModal('vessel'));
    document.getElementById('kpi-total-agents').addEventListener('click', () => showShipNamesModal('agent'));
    document.getElementById('kpi-total-routes').addEventListener('click', () => showShipNamesModal('route'));


    // === INISIALISASI UTAMA ===
    updateKPIs();
    initLoadChart();
    initAgentChart();
    initTopRouteChart();
    renderShipListSim(); // Memanggil fungsi render kapal yang telah diupdate

    hideLoadingAndShowDashboard();


});
