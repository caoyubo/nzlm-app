package com.shop.market.base.custom;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.Button;
import android.widget.TextView;

import com.ionicframework.starter.R;

/**
 * Created by sukunyue on 2016/1/27.
 */
public class SkyToastDialog extends Dialog {

    public SkyToastDialog(Context context) {
        super(context);
    }
    public SkyToastDialog(Context context, int theme) {
        super(context, theme);
    }

    public static class Builder {
        private SkyToastDialog dialog;
        private Context context;
        private String title;
        private String message;
        private String positiveButtonText;
        private OnClickListener positiveButtonClickListener;

        public Builder(Context context) {
            this.context = context;
            dialog = new SkyToastDialog(context, R.style.dialog);
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }

        public Builder setPositiveButton(String positiveButtonText, OnClickListener listener) {
            this.positiveButtonText = positiveButtonText;
            this.positiveButtonClickListener = listener;
            return this;
        }

        public Builder initView() {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View layout = inflater.inflate(R.layout.dialog_toast, null);
            dialog.addContentView(layout, new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
            if (title != null) {
                ((TextView) layout.findViewById(R.id.tvTitle)).setText(title);
            }
            if (message != null) {
                ((TextView) layout.findViewById(R.id.tvMessage)).setText(message);
            }
            if (positiveButtonText != null) {
                ((Button) layout.findViewById(R.id.btnPositiveButton)).setText(positiveButtonText);
            }
            if (positiveButtonClickListener != null) {
                ((Button) layout.findViewById(R.id.btnPositiveButton)).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        dismiss();
                        positiveButtonClickListener.onClick(dialog, DialogInterface.BUTTON_POSITIVE);
                    }
                });
            } else {
                ((Button) layout.findViewById(R.id.btnPositiveButton)).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        dismiss();
                    }
                });
            }
            return this;
        }

        public Builder show() {
            dialog.show();
            return this;
        }

        public Builder dismiss() {
            dialog.dismiss();
            return this;
        }

        public Builder setCancelable(boolean flag) {
            dialog.setCancelable(flag);
            return this;
        }
    }
}
