package com.shop.market.base.custom;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.ionicframework.starter.R;

/**
 * Created by sukunyue on 2016/1/27.    ---  有PositiveButton以及btnNegativeButton的对话框
 */
public class SkyChooseDialog extends Dialog {

    public SkyChooseDialog(Context context) {
        super(context);
    }

    public SkyChooseDialog(Context context, int theme) {
        super(context, theme);
    }

    public static class Builder {
        private SkyChooseDialog dialog;
        private Context context;
        private String title;
        private String message;
        private String positiveButtonText;
        private String negativeButtonText;
        private OnClickListener positiveButtonClickListener;
        private OnClickListener negativeButtonClickListener;

        public Builder(Context context) {
            this.context = context;
            this.dialog = new SkyChooseDialog(context, R.style.dialog);
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

        public Builder setNegativeButton(String negativeButtonText, OnClickListener listener) {
            this.negativeButtonText = negativeButtonText;
            this.negativeButtonClickListener = listener;
            return this;
        }

        public SkyChooseDialog.Builder initView() {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View layout = inflater.inflate(R.layout.dialog_choose, null);
            dialog.addContentView(layout, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.FILL_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
            /* 设置为不可点击空白处关闭对话框 */
            dialog.setCancelable(false);
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
            if (negativeButtonText != null) {
                ((Button) layout.findViewById(R.id.btnNegativeButton)).setText(negativeButtonText);
            }
            if (negativeButtonClickListener != null) {
                ((Button) layout.findViewById(R.id.btnNegativeButton)).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        dismiss();
                        negativeButtonClickListener.onClick(dialog, DialogInterface.BUTTON_POSITIVE);
                    }
                });
            } else {
                ((Button) layout.findViewById(R.id.btnNegativeButton)).setOnClickListener(new View.OnClickListener() {
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
