const Form = require('../models/Form');
const axios = require('axios');

const create = async (req, res, next) => {
    try {
        const questions = req.body.questions.map(block => ({
            ...block,
            values: block.values.filter(qst => qst.question.length !== 0)
        })).filter(block => block.values.length !== 0);

        let out = { ...req.body, questions: questions };

        const form = new Form(out);

        await form.save();

        return res.status(201).json(form);

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Якась халепа' })
    }
}

const getAll = async (req, res, next) => {
    try {
        const forms = await Form.find({}, { "name": 1, createdAt: 1});

        return res.status(201).json(forms);

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Якась халепа' })
    }
}

const get = async (req, res, next) => {
    try {

        const form = await Form.findOne({ _id: req.params.id });

        return res.status(201).json(form);

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Якась халепа' })
    }
}

const update = async (req, res, next) => {
    try {
        const form = await Form.findOne({ _id: req.params.id });

        if (!form) {
            return res.status(500).json({ message: 'Такої анкети не існує' });
        }

        const questions = req.body.questions.map(block => ({
            ...block,
            values: block.values.filter(qst => qst.question.length !== 0)
        })).filter(block => block.values.length !== 0);

        const updatedForm = await Form.updateOne({ _id: req.params.id }, { $set: { ...req.body, questions: questions } });

        if (updatedForm.modifiedCount > 0) {
            const form = await Form.findOne({ _id: req.params.id });

            return res.status(201).json(form);
        } else {
            return res.status(500).json({ message: 'Якась халепа' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Якась халепа' })
    }
}

const remove = async (req, res, next) => {
    try {

        const removedForm = await Form.deleteOne({ _id: req.params.id });

        if (removedForm.deletedCount > 0) {
            return res.status(201).json(removedForm._id);
        } else {
            return res.status(500).json({ message: 'Якась халепа' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Якась халепа' })
    }
}

const getUserFields = async (req, res, next) => {
    try {
        return res.status(201).json([
            {
                "name": "Продавець-консультант",
                "id": "85"
            },
            {
                "name": "Менеджер відділу продажу",
                "id": "87"
            },
            {
                "name": "Пакувальник посилок",
                "id": "89"
            },
            {
                "name": "Помічник HR-менеджера",
                "id": "103"
            },
            {
                "name": "Менеджер по роботі з клієнтами",
                "id": "101"
            },
            {
                "name": "Старший продавець",
                "id": "91"
            },
            {
                "name": "SMM",
                "id": "93"
            },
            {
                "name": "Монтажер",
                "id": "95"
            },
            {
                "name": "Головний бухгалтер",
                "id": "97"
            },
            {
                "name": "Менеджер з відкриття магазинів",
                "id": "99"
            },
            {
                "name": "РОП",
                "id": "603"
            },
            {
                "name": "Аналітик",
                "id": "1102"
            },
            {
                "name": "Помічник менеджера по продажам",
                "id": "1112"
            },
            {
                "name": "Програміст",
                "id": "1159"
            },
            {
                "name": "Контроль",
                "id": "1184"
            },
            {
                "name": "Контент на Сайт",
                "id": "1361"
            },
            {
                "name": "Бухгалтер по ФОП",
                "id": "1424"
            },
            {
                "name": "Оператор 1С",
                "id": "1430"
            }
        ]);
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Якась халепа' })
    }
}

const sendForm = async (req, res, next) => {
    try {

        // надсилаємо у срм

        return res.status(201).json({ message: "Успіх" });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Якась халепа' })
    }
}

module.exports = { create, getAll, get, update, remove, getUserFields, sendForm };

