let GunData = {
    LowestSMG: {
        SP: false,
        threshold: [30, 30, 30, 30],
        type: 'SMG',
        guns: ['MP40', '伯萊塔38型', 'PPSh-41', 'M3', 'Spectre M4', 'IDW',
            '64式', 'm45', 'PP-2000', 'MAC-10', '蠍式', 'PPS-43', '微型烏茲',
            'MP5', '湯姆森']
    },
    LowestHG: {
        SP: true,
        threshold: [30, 30, 30, 30],
        type: 'HG',
        guns: ['PPK', 'M1911', '納甘左輪', 'P38', 'FNP-9', 'MP-446', '托卡列夫',
            '阿斯特拉左輪', 'P08', 'M9', 'C96', '馬卡洛夫', '92式', 'P99',
            '柯爾特左輪', 'Mk23', 'P7', '灰熊MKV']
    },
    RemainHG: {
        SP: false,
        threshold: [130, 130, 130, 30],
        type: 'HG',
        guns: ['M950A', '維爾德MKII']
    },
    GeneralSMG: {
        SP: false,
        threshold: [400, 400, 30, 30],
        type: 'SMG',
        guns: ['斯登MKII', 'UMP9', 'UMP45', 'PP-90', 'Vector', '索米', 'G36C',
            '79式', 'SR-3MP']
    },
    GeneralAR: {
        SP: true,
        type: 'AR',
        guns: ['L85A1', 'G3', '加利爾', 'SIG-510', 'F2000', 'AK-47', 'FNC',
            'StG44', 'OTs-12', 'AS Val', '56式', 'FAMAS', '9A-91', 'HK416', 'G11']
    },
    HigherAR: {
        SP: false,
        threshold: [30, 400, 400, 30],
        type: 'AR',
        guns: ['G36', 'TAR-21', 'G41', 'FAL', '95式', '97式']
    },
    GeneralRF: {
        SP: false,
        threshold: [300, 30, 300, 30],
        type: 'RF',
        guns: ['SVT-38', 'G43', 'FN-49', '西蒙諾夫', 'BM59',
            'M1加蘭德', 'M14', 'SV-98',
            '春田', '莫辛納甘', 'PTRD', 'SVD',
            'WA2000', 'NTW-20']
    },
    HigherRF: {
        SP: false,
        threshold: [400, 30, 400, 30],
        type: 'RF',
        guns: ['漢陽造88式', 'Kar98k', '李-恩菲爾德', 'M99']
    },
    GeneralMG: {
        SP: false,
        threshold: [400, 600, 30, 300],
        type: 'MG',
        guns: ['MG43', 'DP28', 'AAT-52', 'LWMMG', 'FG42',
            'M1919A4', 'MG42', 'M2HB', '布倫',
            'MG3', 'M1918', 'M60', 'Mk48',
            'MG4', 'MG5']
    },
    HigherMG: {
        SP: false,
        threshold: [600, 600, 100, 400],
        type: 'MG',
        guns: ['PK', '內格夫']
    }
};

export default GunData;
