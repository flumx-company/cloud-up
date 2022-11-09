import notify from 'devextreme/ui/notify';

export class MessageToast {
    static showError(msg: string, delay = 4000) {
        notify(msg, 'error', delay);
    }

    static showSuccess(msg: string, delay = 4000) {
        notify(msg, 'success', delay);
    }
}
